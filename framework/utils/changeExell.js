const XLSX = require("xlsx");


function writeExsel(value, pathToFile) {
    const workbook = XLSX.readFile(pathToFile);

    const firstSheetName = workbook.SheetNames[0];

    /* This function creates gap rows */
    function create_gap_rows(ws, nrows) {
        var ref = XLSX.utils.decode_range(ws["!ref"]);       // get original range
        ref.e.r += nrows;                                    // add to ending row
        ws["!ref"] = XLSX.utils.encode_range(ref);           // reassign row
    }

    const ec = (r, c) => {
        return XLSX.utils.encode_cell({r:r,c:c})
    }

    const delete_row = (ws, row_index) => {
        let range = XLSX.utils.decode_range(ws["!ref"])
        for(let R = row_index; R < range.e.r; ++R){
            for(let C = range.s.c; C <= range.e.c; ++C){
                ws[ec(R, C)] = ws[ec(R+1, C)]
            }
        }
        range.e.r--
        ws['!ref'] = XLSX.utils.encode_range(range.s, range.e)
    }

    for(let rowIndex = 1; rowIndex < 3; rowIndex++){
        delete_row(workbook.Sheets[firstSheetName], rowIndex);
    }


    /* Write data starting at A2 */
    XLSX.utils.sheet_add_aoa(workbook.Sheets[firstSheetName], value, {origin: "A2"});

    XLSX.writeFile(workbook, "commonIndicatorsValues1.xlsx", {compression: false});

}


module.exports = {
    writeExsel: writeExsel
}