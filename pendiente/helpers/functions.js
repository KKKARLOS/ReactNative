export function initBoard (cells){

    let output=[];

    for(let i = 0; i < cells; i++){

        output.push({id:i, image:0});
    }

    return output
}
