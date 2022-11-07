const addButton = document.getElementById("add-button");
const removeButton = document.getElementById("remove-button");
const editButton = document.getElementById("edit-button");
const clearButton = document.getElementById("clear-button");
const shape = document.getElementById("shape");
const scaleX = document.getElementById("scale-x");
const scaleY = document.getElementById("scale-y");
const scaleZ = document.getElementById("scale-z");
const translationX = document.getElementById("translation-x");
const translationY = document.getElementById("translation-y");
const translationZ = document.getElementById("translation-z");
const colorRed = document.getElementById("color-r");
const colorGreen = document.getElementById("color-g");
const colorBlue = document.getElementById("color-b");
const rotationZ = document.getElementById("rotation-z");
const objects = document.getElementById("objects");

const scene = new Scene();


addButton.onclick = function() {
    addObjectToScene();
    scene.draw();

    updateObjectList();
};

editButton.onclick = function() {
    if (objects.value) {
        scene.removeObject(objects.value);
        addObjectToScene();
        scene.draw();

        updateObjectList();
    }
}

clearButton.onclick = function() {
    if (objects.value) {
        scene.clearObjectsModelMatrix(objects.value);
        scene.draw();

        updateObjectList();
    }
}

removeButton.onclick = function() {
    if (objects.value) {
        scene.removeObject(objects.value);
        scene.draw();

        updateObjectList();
    }
};

function addObjectToScene() {
    const name = 'object_'.concat(shape.value).concat(String(Date.now()));
    const translation = [Number(translationX.value), Number(translationY.value), Number(translationZ.value)];
    const scale = [Number(scaleX.value), Number(scaleY.value), Number(scaleZ.value)];
    const rotation = Number(rotationZ.value);
    const color = [Number(colorRed.value), Number(colorGreen.value), Number(colorBlue.value)];

    if (shape.value == "quad") {
        scene.addObject(new Quad(name, scale, translation, rotation, color));
    } else if (shape.value == "cube") {
        scene.addObject(new Cube(name, scale, translation, rotation, color));
    } else if (shape.value == "sphere") {
        scene.addObject(new Sphere(name, scale, translation, rotation, color));
    } else if (shape.value == "square-pyramid") {
        scene.addObject(new SquarePyramid(name, scale, translation, rotation, color));
    } else if (shape.value == "cylinder") {
        scene.addObject(new Cylinder(name, scale, translation, rotation, color));
    } else if (shape.value == "disc") {
        scene.addObject(new Disc(name, scale, translation, rotation, color));
    } else if (shape.value == "cone") {
        scene.addObject(new Cone(name, scale, translation, rotation, color));
    }
}

function updateObjectList() {
    objects.innerHTML = "";

    for (let object of scene.objects) {
        const option = document.createElement("option");
        option.innerHTML = object.name;
        objects.appendChild(option);
    }
}