/**
 * Represents the overworld of the game.
 * @class
 */
class Overworld {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
        this.map = null
    }

    /**
     * Starts the game loop.
     */
    startGameLoop() {
        const step = () => {
            //clean canvas for every loop 
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            
            //establish the camera person
            const cameraPerson = this.map.gameObjects.hero

            //Update all objects in the game
            Object.values(this.map.gameObjects).forEach((object) => {
                object.update({ // .update from Person
                    arrow: this.directionInput.direction  //invoked from DirectionInput - getter so no ()
                })
            })

            //Draw Lower Layer
            this.map.drawLowerImage(this.ctx, cameraPerson)

            //Draw Game Objects
            Object.values(this.map.gameObjects).forEach((object) => {
                object.sprite.draw(this.ctx, cameraPerson) //draws the sprite of the object (Person) - .draw from Sprite
            })

            //Draw Upper Layer
            this.map.drawUpperImage(this.ctx, cameraPerson)

            //requestAnimationFrame is from window 
            requestAnimationFrame(() => {
                step()
            })
        }
        step() //starts the loop
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom)

        this.directionInput = new DirectionInput()
        this.directionInput.init()//Even though init is called only once, the event listeners it sets up will continue to listen for keyboard events for the lifetime of the page (or until they are explicitly removed). This is how the direction can be continuously updated even though init is only called once.
        this.startGameLoop()
    }

}
  