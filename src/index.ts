
import { v4 as uuidv4 } from 'uuid';

class InventoryItem {
    private id: string;
    private name: string;
    private price: number;
    private description: string;

    constructor(name: string, price: number, description: string) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
        this.description = description;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }
}

class Weapon extends InventoryItem {
    private damage: number;

    constructor(name: string, price: number, description: string, damage: number) {
        super(name, price, description);
        this.damage = damage;
    }

    getDamage(): number {
        return this.damage;
    }

    setDamage(damage: number): void {
        this.damage = damage;
    }
}

class Armor extends InventoryItem {
    private defense: number;

    constructor(name: string, price: number, description: string, defense: number) {
        super(name, price, description);
        this.defense = defense;
    }

    getDefense(): number {
        return this.defense;
    }

    setDefense(defense: number): void {
        this.defense = defense;
    }
}

class Character {
    id: string;
    name: string;
    archtype: string;
    fightingStyle: 'ranged' | 'melee';
    inventory: InventoryItem[];

    constructor(name: string, archtype: string, fightingStyle: 'ranged' | 'melee') {
        this.id = uuidv4();
        this.name = name;
        this.archtype = archtype;
        this.fightingStyle = fightingStyle;
        this.inventory = [];
    }

    static createRPGCharacter(name: string, race: string) {
        return new Character(name, race, 'ranged'); 
    }
//     character1= new Character('Lyla',"Rouge Elf","ranged")
// /   character2= new Character('Toby','Undead','melee')
//     console.log(character1,'character test')



    inventoryHTMLElement() {
        
        const inventoryDiv = document.getElementById('Inventory');
        if (inventoryDiv) {
            inventoryDiv.innerHTML = ''; // Clear previous content

            for (const item of this.inventory) {
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `Name: ${item.getName()}, Price: ${item.getPrice()}`;

                const removeOneButton = document.createElement('button');
                removeOneButton.innerText = 'Remove One';
                removeOneButton.addEventListener('click', () => this.removeOneItem(item));

                const removeAllButton = document.createElement('button');
                removeAllButton.innerText = 'Remove All';
                removeAllButton.addEventListener('click', () => this.removeAllItems(item));

                itemElement.appendChild(removeOneButton);
                itemElement.appendChild(removeAllButton);

                inventoryDiv.appendChild(itemElement);
            }
        }
    }

    removeOneItem(item: InventoryItem) {
        
        const index = this.inventory.indexOf(item);
        if (index > -1) {
            this.inventory.splice(index, 1);
            this.inventoryHTMLElement(); 
        }
    }

    removeAllItems(item: InventoryItem) {
        this.inventory = this.inventory.filter(i => i !== item);
        this.inventoryHTMLElement(); 
    }
}

class Inventory {
    items: InventoryItem[];

    constructor() {
        this.items = [];
    }

    showItems() {
        const shopDiv = document.getElementById('Shop');
        if (shopDiv) {
            shopDiv.innerHTML = ''; // Clear previous content
            for (const item of this.items) {
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `Name: ${item.getName()}, Price: ${item.getPrice()}`;
                shopDiv.appendChild(itemElement);
            }
        }
    }

    updateInventory(character: Character) {

        const inventoryDiv = document.getElementById('Inventory');
        if (inventoryDiv) {
            inventoryDiv.innerHTML = '';

            if (character.inventory.length === 0) {
              
                inventoryDiv.innerHTML = 'Inventory is empty.';
            } else {
                character.inventoryHTMLElement();
            }
        }
    }

    static createRPGItems() {
    
        return [
            new Weapon('Sword', 50, 'A sharp sword', 20),
            new Armor('Shield', 30, 'A sturdy shield', 15),
        ];
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const createCharacterButton = document.getElementById('createCharacterButton') as HTMLButtonElement;
    createCharacterButton.addEventListener('click', () => {
        const characterName = (document.getElementById('charName') as HTMLInputElement).value;
        const characterRace = (document.getElementById('charRace') as HTMLInputElement).value;

        const character = Character.createRPGCharacter(characterName, characterRace);

        const inventory = new Inventory();
        inventory.items = Inventory.createRPGItems();
        character.inventory = inventory.items;

        inventory.updateInventory(character);
        inventory.showItems();
    });
});


    // console.log(`${character1.name} is a ${character1.archtype} with a ${character1.fightingStyle} fighting style`)
    // console.log(`${character2.name} is a ${character2.archtype} with a ${character2.fightingStyle} fighting style`)
