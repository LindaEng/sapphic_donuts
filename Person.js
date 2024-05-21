class Person extends GameObject {
    constructor(config) {
        super(config)
        this.movingProgressRemaining = 0 //how many steps left to move

        this.isPlayerControlled = config.isPlayerControlled || false

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }

    }
    //state - {arrow: this.directionInput.direction} //left,right,up,down
    //updates the position and sprite of the person
    update(state) {         
        this.updatePosition()
        this.updateSprite(state) //this.direction - default is down from GameObject class
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow
            this.movingProgressRemaining = 4 
        }

    }
    //updates the position of the person - x and y
    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction]
            this[property] += change //changes x y -> this.x this.y -> inherited from GameObject class
            this.movingProgressRemaining -= 1
        }
    }
    //updates the sprite of the person - frames
    updateSprite(state) {
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprite.setAnimation("idle-"+this.direction)
            return
        }

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction)
        }
    }
}