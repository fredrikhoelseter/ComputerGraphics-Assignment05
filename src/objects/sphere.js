class Sphere {
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
        // Create a sphere

        const SPHERE_DIV = 20;
        let i, ai, si, ci;
        let j, aj, sj, cj;
        let p1, p2;
        const verticesArray = [];
        const colorsArray = [];
        // Set up the vertices and vertex colors of the sphere.
        for (j = 0; j <= SPHERE_DIV; j++) 
        {
            aj = j * Math.PI / SPHERE_DIV;
            sj = Math.sin(aj);
            cj = Math.cos(aj);
            for (i = 0; i <= SPHERE_DIV; i++) 
            {
                ai = i * 2 * Math.PI / SPHERE_DIV;
                si = Math.sin(ai);
                ci = Math.cos(ai);
                verticesArray.push(si * sj);  // X-coordinate of the vertex
                verticesArray.push(cj);       // Y-coordinate of the vertex
                verticesArray.push(ci * sj);  // Z-coordinate of the vertex

                // Add color to the sphere.
                // To do: Add a material to the sphere.
                colorsArray.push(this.color[0]);
                colorsArray.push(this.color[1]);
                colorsArray.push(this.color[2]);
            }
        }
        // Cast the arrays to Float32Arrays
        const vertices = new Float32Array(verticesArray);
        const colors = new Float32Array(colorsArray);

        const indicesArray = [];
        // Setup the triangles of the sphere.
        for (j = 0; j < SPHERE_DIV; j++)
        {
            for (i = 0; i < SPHERE_DIV; i++)
            {
                p1 = j * (SPHERE_DIV+1) + i;
                p2 = p1 + (SPHERE_DIV+1);
                indicesArray.push(p1);
                indicesArray.push(p2);
                indicesArray.push(p1 + 1);
                indicesArray.push(p1 + 1);
                indicesArray.push(p2);
                indicesArray.push(p2 + 1);
            }
        }
        const indices = new Uint16Array(indicesArray);

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