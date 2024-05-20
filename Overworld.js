class Overworld {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
    }

    startGameLoop() {
        const step = () => {
            //requestAnimationFrame is from window
            requestAnimationFrame(() => {
                step()
            })
        }
        step() //starts the loop
    }

    init() {

        this.startGameLoop()

    }

}