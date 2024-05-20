class GameObject {
    constructor(config) {
        this.x = config.x || 0
        this.y = config.y || 0
        this.sprite = new Sprite({
            gameObject: this, //passing properties of GameObject to Sprite config
            src: config.src || "/images/characters/people/hero.png"
        })
    }
}

// Class Creation: Introduce a GameObject class to encapsulate the properties and behaviors of any interactable element.
// State Management: Each game object manages its own state, including position (x and y coordinates) and appearance.