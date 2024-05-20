class Overworld {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
        this.map = null
    }
    //helps update frames
    startGameLoop() {
        const step = () => {
            //clean canvas for every loop 
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            //Draw Lower Layer
            this.map.drawLowerImage(this.ctx)

            //Draw Game Objects
            Object.values(this.map.gameObjects).forEach((object) => {
                object.x += 0.2
                object.sprite.draw(this.ctx)
            })

            //Draw Upper Layer
            this.map.drawUpperImage(this.ctx)

            //requestAnimationFrame is from window 
            requestAnimationFrame(() => {
                step()
            })
        }
        step() //starts the loop
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom)
        this.startGameLoop()
    }

}