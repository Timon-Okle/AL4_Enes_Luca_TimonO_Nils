const selectors = {
            boardContainer: document.querySelector('.board-container'),
            board: document.querySelector('.board'),
            moves: document.querySelector('.moves'),
            timer: document.querySelector('.timer'),
            start: document.querySelector('button'),
            win: document.querySelector('.win')
        }
        
        const state = {
            SpielStart: false,
            umgedrehteKarten: 0,
            totalFlips: 0,
            gesamtZeit: 0,
            Schleife: null
        }
        
        const shuffle = array => {
            const clonedArray = [...array]
        
            for (let index = clonedArray.length - 1; index > 0; index--) {
                const randomIndex = Math.floor(Math.random() * (index + 1))
                const original = clonedArray[index]
        
                clonedArray[index] = clonedArray[randomIndex]
                clonedArray[randomIndex] = original
            }
        
            return clonedArray
        }
        
        const pickRandom = (array, items) => {
            const clonedArray = [...array]
            const randomPicks = []
        
            for (let index = 0; index < items; index++) {
                const randomIndex = Math.floor(Math.random() * clonedArray.length)
                
                randomPicks.push(clonedArray[randomIndex])
                clonedArray.splice(randomIndex, 1)
            }
        
            return randomPicks
        }
        
        const generateGame = () => {
            const dimensions = selectors.board.getAttribute('data-dimension')
        
            if (dimensions % 2 !== 0) {
                throw new Error("Die Grösse des Brettes muss eine gerade Zahl sein.")
            }
        
            const emojis = ['🍹', '🍺', '🍾', '🥂', '🍸', '🧊', '🥃', '🍷', '🥤', '🍻']
            const picks = pickRandom(emojis, (dimensions * dimensions) / 2) 
            const items = shuffle([...picks, ...picks])
            const cards = `
                <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
                    ${items.map(item => `
                        <div class="card">
                            <div class="card-front"></div>
                            <div class="card-back">${item}</div>
                        </div>
                    `).join('')}
               </div>
            `
            
            const parser = new DOMParser().parseFromString(cards, 'text/html')
        
            selectors.board.replaceWith(parser.querySelector('.board'))
        }
        
        const startGame = () => {
            state.SpielStart = true
            selectors.start.classList.add('disabled')
        
            state.Schleife = setInterval(() => {
                state.gesamtZeit++
        
                selectors.moves.innerText = `${state.totalFlips} Züge`
                selectors.timer.innerText = `Zeit: ${state.gesamtZeit} Sekunden`
            }, 1000)
        }
        
        const flipBackCards = () => {
            document.querySelectorAll('.card:not(.matched)').forEach(card => {
                card.classList.remove('umgedreht')
            })
        
            state.umgedrehteKarten = 0
        }
        
        const flipCard = card => {
            state.umgedrehteKarten++
            state.totalFlips++
        
            if (!state.SpielStart) {
                startGame()
            }
        
            if (state.umgedrehteKarten <= 2) {
                card.classList.add('umgedreht')
            }
        
            if (state.umgedrehteKarten === 2) {
                const umgedrehteKarten = document.querySelectorAll('.umgedreht:not(.matched)')
        
                if (umgedrehteKarten[0].innerText === umgedrehteKarten[1].innerText) {
                    umgedrehteKarten[0].classList.add('matched')
                    umgedrehteKarten[1].classList.add('matched')
                }
        
                setTimeout(() => {
                    flipBackCards()
                }, 1000)
            }
        
            // If there are no more cards that we can flip, we won the game
            if (!document.querySelectorAll('.card:not(.umgedreht)').length) {
                setTimeout(() => {
                    selectors.boardContainer.classList.add('umgedreht')
                    selectors.win.innerHTML = `
                        <span class="win-text">
                            Toll gemacht!<br />
                            Du hast <span class="highlight">${state.totalFlips}</span> Züge und <span class="highlight">${state.gesamtZeit}</span> Sekunden.<br />
                            <p><a class="highlight" href="https://google.ch" onclick="window.open(this.href, '', 'resizable=no,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no,width=960,left=center,height=540'); return false;">Zum Gewinnspiel</a></p>
                        </span>
                    `
        
                    clearInterval(state.Schleife)
                }, 1000)
            }
        }
        
        const attachEventListeners = () => {
            document.addEventListener('click', event => {
                const eventTarget = event.target
                const eventParent = eventTarget.parentElement
        
                if (eventTarget.className.includes('card') && !eventParent.className.includes('umgedreht')) {
                    flipCard(eventParent)
                } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
                    startGame()
                }
            })
        }
        
        generateGame()
        attachEventListeners()
