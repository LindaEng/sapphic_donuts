class Overworld {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
    }

    init() {
        //background
        const image = new Image() //The image class is a built-in global object in Javascript provided by the browser's WEB API
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0)
        }       
        image.src="/images/maps/DemoLower.png"

        //person
        const x = 5
        const y = 6
        const hero = new Image()
        hero.onload = () => {
            this.ctx.drawImage(
                hero,
                0, //left cut
                0, //top cut
                32, //width of cut (size px)
                32, //height of cut (size px)
                x * 16 - 8, //placement x axis
                y * 16 - 16, //placement y axis
                32, //size of character
                32 // size of character
            )
        }
        hero.src="/images/characters/people/hero.png"
    }

}