function display_ui(){
    rectMode(CORNER);

    fill(255);
    rect(6, 0, 69 + (ids[inputMode].type.length * 8), 20);
    fill(100);
    rect(8, 0, 65 + (ids[inputMode].type.length * 8), 17);

    fill(255);
    text("Input Type: ", 10, 13);
    fill(idColors[inputMode]);
    text(ids[inputMode].type, 75, 13);
}