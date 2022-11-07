class SquarePyramid {
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
        // Create a square pyramid.


        // The vertices of the pyramid.
        const vertices = new Float32Array([   
            -1.0, -1.0, 1.0,    1.0, -1.0, 1.0,    1.0,-1.0, -1.0,   -1.0,-1.0, -1.0,  // base
            -1.0, -1.0, 1.0,    1.0, -1.0, 1.0,    0.0, 1.0,  0.0,                     // front
            -1.0, -1.0,-1.0,   -1.0, -1.0, 1.0,    0.0, 1.0,  0.0,                     // left
             1.0, -1.0,-1.0,    0.0,  1.0, 0.0,    1.0,-1.0,  1.0,                     // right
             0.0,  1.0, 0.0,    1.0, -1.0,-1.0,   -1.0,-1.0, -1.0                      // back
        ]);

        // The colors of the vertices.
        const colors = new Float32Array([ 
            0.4, 0.4, 1.0,     0.4, 0.4, 1.0,     0.4, 0.4, 1.0,    0.4, 0.4, 1.0,  // base(blue)
            this.color[0],   this.color[1],   this.color[2],   //front(user defined color)
            this.color[0],   this.color[1],   this.color[2], 
            this.color[0],   this.color[1],   this.color[2], 
            1.0, 0.4, 0.4,     1.0, 0.4, 0.4,     1.0, 0.4, 0.4,                    // left(red)
            1.0, 1.0, 0.4,     1.0, 1.0, 0.4,     1.0, 1.0, 0.4,                    // right
            1.0, 1.0, 1.0,     1.0, 1.0, 1.0,     1.0, 1.0, 1.0                     // back (white)
        ]);

        // How the triangles will be drawn
        const indices = new Uint16Array([       // Indices of the vertices
            0, 1, 2,   0, 2, 3,    // base - consisting of 2 triangles since its a square
            4, 5, 6,               // front
            7, 8, 9,               // left
            10,11,12,              // right
            13,14,15               // back 
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