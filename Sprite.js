class Sprite {
    /**
     * Creates a new Sprite object.
     * @param {Object} config - The configuration object for the Sprite.
     * @param {string} config.src - The source URL of the image for the Sprite.
     * @param {Object} config.animations - The animations for the Sprite.
     * @param {string} config.currentAnimation - The current animation of the Sprite.
     * @param {number} config.animationFrameLimit - The limit of animation frames for the Sprite.
     * @param {Object} config.gameObject - The game object associated with the Sprite.
     */
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
            "walk-right": [ [1,1], [0,1], [1,1], [0,1] ],
            "walk-up": [ [0,2], [1,2], [2,2], [3,2] ],
            "walk-left": [ [0,3], [1,3], [2,3], [3,3] ],
        } // all animations of sprite. Default of idleDown
        this.currentAnimation = config.currentAnimation || "idle-down"
        this.currentAnimationFrame = 0 // first animation frame

        this.animationFrameLimit = config.animationFrameLimit || 8 //game loop frames - how long should each frame stay
        this.animationFrameProgress = this.animationFrameLimit

        //Reference the game object
        this.gameObject = config.gameObject
    }

    get frame() { //gets current frame - util function
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    /**
     * Sets the animation for the sprite.
     * @param {string} key - The key of the animation to set.
     */
    setAnimation(key) {
        if(this.currentAnimation !== key) { //if its another direction
            this.currentAnimation = key
            this.currentAnimationFrame = 0 //set to the first frame
            this.animationFrameProgress = this.animationFrameLimit
        }
    }

    /**
     * Updates the animation progress of the sprite.
     * Decreases the animation frame progress by 1, and increments the current animation frame by 1.
     * Resets the animation frame progress and sets the current animation frame to 0 if the frame is undefined.
     */
    updateAnimationProgress() {
        if(this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1
            return
        }
        //resets frame progress
        this.animationFrameProgress = this.animationFrameLimit
        this.currentAnimationFrame += 1 //helps move through the animation array
        if(this.frame === undefined) {
            this.currentAnimationFrame = 0 //cycles back to 0 index
        }
    }

    /**
     * Draws the shadow and sprite of the game object on the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx, cameraPerson) { //Draws Shadow and Sprite
        const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x
        const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y

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
