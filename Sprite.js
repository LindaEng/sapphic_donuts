class Sprite {
    constructor(config) {

        //Set up the Image
        this.image = new Image()
        this.image.src = config.src
        this.image.onload = () => {
            this.isLoaded = true
        }
        
        //Configure Animation && Initial State
        this.animations = config.animations || {
            idleDown: [
                [0,0]
            ]
        } // all animations of sprite. Defaul of idleDown
        this.currentAnimations = config.currentAnimations || "idleDown"
        this.currentAnimationFrame = 0 // first animation frame

        //Reference the game object
        this.gameObject = config.gameObject
    }

    draw(ctx) { //refactored from Overworld
        const x = this.gameObject.x * 16 - 8
        const y = this.gameObject.y * 16 - 16

        ctx.drawImage(
            this.image,
            0,0, //top left cut 
            32,32, // width height px of cut
            x,y, // placement of x and y
            32,32 // size of character
        )
    }
}