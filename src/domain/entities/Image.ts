export class Image {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public path: string,
        public createdAt: Date,
        public collectionId: string
    ) {}

    rename(newName: string) {
        if(!newName || newName.length < 3) {
            throw new Error("Invalid image name");
        }
        this.name = newName;
    }
}