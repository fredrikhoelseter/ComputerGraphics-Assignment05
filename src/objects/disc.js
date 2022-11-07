class Disc {
    constructor(name, scale, translation, rotation, color) {
        this.name = name;
        this.shape = shape;
        this.scale = scale;
        this.translation = translation;
        this.rotation = rotation;
        this.color = color;

        this.modelMatrix = new Matrix4();
        this.modelMatrix.setTranslate(this.translation[0], this.translation[1], this.translation[2]);
        this.modelMatrix.scale(this.scale[0], this.scale[1], this.scale[2]);
        this.modelMatrix.rotate(this.rotation, 0, 0, 1);
    }

    initVertexBuffers(gl) {
        const vertices = new Float32Array([
            0,      0,      0, // v0, the center vertex
            1,      0,      0, // v1, the east vertex
            0.9239, 0, 0.3827, // v2, the north east east vertex
            0.7071, 0, 0.7071, // v3, the north east vertex
            0.3827, 0, 0.9239, // v4, the north north east vertex
            0,      0,      1, // v5, the north vertex
            -0.3827,0, 0.9239, // v6, the north north west vertex
            -0.7071,0, 0.7071, // v7, the north west vertex
            -0.9239,0, 0.3827, // v8, the north west west vertex
            -1,     0,      0, // v9, the west vertex
            -0.9239,0,-0.3827, // v10, the south west west vertex
            -0.7071,0,-0.7071, // v11, the south west vertex
            -0.3827,0,-0.9239, // v12, the south south west vertex
            0,      0,     -1, // v13, the south vertex
            0.3827, 0,-0.9239, // v14, the south south east vertex
            0.7071, 0,-0.7071, // v15, the south east vertex
            0.9239, 0,-0.3827  // v16, the south east east vertex
        ]);

        const colors = new Float32Array([
            this.color[0],   this.color[1],   this.color[2],   // Center is user defined color
            1,   0.4, 0.4, // Edges are red
            1,   0.4, 0.4,
            1,   0.4, 0.4,
            1,   0.4, 0.4,
            1,   0.4, 0.4,
            1,   0.4, 0.4,
            1,   0.4, 0.4,
            1,   0.4, 0.4,
            1,   0.4, 0.4,
            1,   0.4, 0.4,
            1,   0.4, 0.4,
            1,   0.4, 0.4,
            1,   0.4, 0.4,
            1,   0.4, 0.4,
            1,   0.4, 0.4,
            1,   0.4, 0.4
        ]);

        const indices = new Uint16Array([
            0, 1, 2,
            0, 2, 3,
            0, 3, 4,
            0, 4, 5,
            0, 5, 6,
            0, 6, 7,
            0, 7, 8,
            0, 8, 9,
            0, 9,10,
            0,10,11,
            0,11,12,
            0,12,13,
            0,13,14,
            0,14,15,
            0,15,16,
            0,16, 1
        ]);

        // Create buffers
        const vertexBuffer = gl.createBuffer();
        const colorBuffer = gl.createBuffer();
        const indexBuffer = gl.createBuffer();
        if (!vertexBuffer || !colorBuffer || !indexBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }
    
        // Get a_Position and a_Color attribute variables
        const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
        if(a_Position < 0) {
            console.log('Failed to get the storage location of a_Position');
            return -1;
        }
        const a_Color = gl.getAttribLocation(gl.program, 'a_Color');
        if(a_Color < 0) {
            console.log('Failed to get the storage location of a_Color');
            return -1;
        }

        // Write the vertex coordinates to the buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        // Assign the buffer object to a_Position and enable the assignment
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);

        // Write the vertex colors to the buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    
        // Assign the buffer object to a_Color and enable the assignment
        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Color);

        // Write the indices to the buffer object
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    
        return indices.length;
    }
}