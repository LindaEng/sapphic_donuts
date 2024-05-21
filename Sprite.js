class Sprite {
    constructor(config) {
        //Set up the Image
        this.image = new Image()
        this.image.src = config.src
        this.image.onload = () => {
            this.isLoaded = true
        }
        
        //Set up the Shadow
        this.shadow = new Image()
        this.useShadow = true
        if (this.useShadow) {
            this.shadow.src = "/images/characters/shadow.png"
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true //personal preference, we can also create the isShadowLoaded property outside and set it to false and set it true in here. Cleaner and shorter code.
        }

        //Configure Animation && Initial State
        this.animations = config.animations || {
            idleDown: [
                [0,0]
            ]
        } // all animations of sprite. Default of idleDown
        this.currentAnimations = config.currentAnimations || "idleDown"
        this.currentAnimationFrame = 0 // first animation frame

        //Reference the game object
        this.gameObject = config.gameObject
    }

    draw(ctx) { //Draws Shadow and Sprite
        const x = this.gameObject.x - 8
        const y = this.gameObject.y - 16

        this.isShadowLoaded && ctx.drawImage(this.shadow,
            x,y,
        )

        this.isLoaded && ctx.drawImage(
            this.image,
            0,0, //top left cut 
            32,32, // width height px of cut
            x,y, // placement of x and y
            32,32 // size of character
        )
    }
}


// Sprite Class: A separate Sprite class handles the visual representation of game objects, including different animations and frames.
// Frame Management: Sprites can show different frames for various actions like idle or walking, supporting animations based on direction and state.
