/**
 * Represents an overworld map in the pizza game.
 * @class
 */
class OverworldMap { 
    /**
     * Creates an instance of OverworldMap.
     * @constructor
     * @param {Object} config - The configuration object for the OverworldMap.
     * @param {Object} config.gameObjects - The Object of game objects on the map.
     * @param {string} config.lowerSrc - The source URL of the lower image layer.
     * @param {string} config.upperSrc - The source URL of the upper image layer.
     */
    constructor(config) {
        this.gameObjects = config.gameObjects

        this.lowerImage = new Image()
        this.lowerImage.src = config.lowerSrc

        this.upperImage = new Image()
        this.upperImage.src = config.upperSrc
    }

    /**
     * Draws the lower image layer on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(this.lowerImage, 
        utils.withGrid(10.5) - cameraPerson.x, 
        utils.withGrid(6) - cameraPerson.y)
    }

    /**
     * Draws the upper image layer on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, 
        utils.withGrid(10.5) - cameraPerson.x, 
        utils.withGrid(6) - cameraPerson.y)
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/DemoLower.png",
        upperSrc: "/images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6)
            }),
            renee: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "/images/characters/people/Renee.png"
            })
        }
    },
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new GameObject({
                x: utils.withGrid(5),
                y: utils.withGrid(6)
            }),
            renee: new GameObject({
                x: 7,
                y: 9,
                src: "/images/characters/people/Renee.png"
            }),
            Indigo: new GameObject({
                x: 7,
                y: 9,
                src: "/images/characters/people/Indigo.png"
            }),
            npcB: new GameObject({
                x: 10,
                y: 4,
                src: "/images/characters/people/npc3.png"
            })
        }
    }
}