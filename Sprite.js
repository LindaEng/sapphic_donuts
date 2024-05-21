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
            "idle-down": [ [0,0] ],
            "idle-right": [ [0,1] ],
            "idle-up": [ [0,2] ],
            "idle-left": [ [1,3] ],
            "walk-down": [ [1,0], [0,0], [3,0], [0,0] ],
            "walk-right": [ [0,1], [1,1], [2,1], [3,1] ],
            "walk-up": [ [0,2], [1,2], [2,2], [3,2] ],
            "walk-left": [ [1,3], [2,3], [3,3], [0,3] ],
        } // all animations of sprite. Default of idleDown
        this.currentAnimation = "walk-left" //config.currentAnimation || "idle-down"
        this.currentAnimationFrame = 0 // first animation frame

        this.animationFrameLimit = config.animationFrameLimit || 16 //element of time  - game loop frames
        this.animationFrameProgress = this.animationFrameLimit

        //Reference the game object
        this.gameObject = config.gameObject
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    updateAnimationProgress() {
        //downtick frame progrss
        if(this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1
            return
        }

        //reset the counter
        this.animationFrameProgress = this.animationFrameLimit
        this.currentAnimationFrame += 1
        
        if(this.frame === undefined) {
            this.currentAnimationFrame = 0
        }
    }

    draw(ctx) { //Draws Shadow and Sprite
        const x = this.gameObject.x - 8
        const y = this.gameObject.y - 16

        this.isShadowLoaded && ctx.drawImage(this.shadow,
            x,y,
        )

        const [frameX, frameY] = this.frame

        this.isLoaded && ctx.drawImage(
            this.image,
            frameX * 32,frameY * 32, //top left cut 
            32,32, // width height px of cut
            x,y, // placement of x and y
            32,32 // size of character
        )
        this.updateAnimationProgress()
    }

}


// Sprite Class: A separate Sprite class handles the visual representation of game objects, including different animations and frames.
// Frame Management: Sprites can show different frames for various actions like idle or walking, supporting animations based on direction and state.
