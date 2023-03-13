// enable double-clicking from Mac Finder or Windows Explorer
#target photoshop // this command only works in Photoshop CS2 and higher

// bring application forward for double-click events
app.bringToFront();



    main(); // at least one document exists proceed
   // specific_testing();

    



//////////////////////////////////////////////////////////////////////////////
//                            main function                                  //
///////////////////////////////////////////////////////////////////////////////
function main() {
	// declare local variables
	var startDisplayDialogs = app.displayDialogs;
	var orig_ruler_units = app.preferences.rulerUnits;
	app.displayDialogs = DialogModes.NO;
	app.preferences.rulerUnits = Units.PIXELS;	// Set the ruler units to PIXELS
	try { 
        
        var mainFolder = Folder.selectDialog("Select the Main Folder that contain all the Master Folders");


        //var OutPut_Folder = Folder.selectDialog("Select the OutPut Folder");
        
        
        executeCode(mainFolder);
     }
	// display error message if something goes wrong
	catch(e) { alert(e + ': on line ' + e.line, 'Script Error', true); }
	app.preferences.rulerUnits = orig_ruler_units;	// Reset units to original settings
	app.displayDialogs = startDisplayDialogs;
}
///////////////////////////////////////////////////////////////////////////////
//                           main function end                               //
///////////////////////////////////////////////////////////////////////////////



function executeCode(mainFolder){
    //getting all master folders 
    //var master_folders = getSubFolders(mainFolder);

   // going to perform operation of each master folder

        var items_inSide_each_master_folder = []
        var items_inSide_each_master_folder = getSubFolders(mainFolder);
        var fileString = String(items_inSide_each_master_folder);
        if (fileString.indexOf("Processed")>-1) {
            var array_of_folders = fileString.split(",");
            for(var p=0;p<array_of_folders.length;p++){
               
                if(array_of_folders[p].indexOf("Processed")>-1){
                    var all_set_folders = getSubFolders(Folder(array_of_folders[p]));

                    //now we are going to get all folders in set and process each images in the set folder

                    for(var setFolderIndex=0; setFolderIndex<all_set_folders.length;setFolderIndex++){
                     
                        var all_Tiff_files = [];
                        var all_Tiff_files = loadingAssets_folderTOArray(all_set_folders[setFolderIndex]);
try{
                        for(var tiff_file_index = 0 ;tiff_file_index< all_Tiff_files.length;tiff_file_index++ ){
                    
                                    var fileRef = new File(all_Tiff_files[tiff_file_index]);
                                    app.open(fileRef);
                                    
                                    if (tiff_file_index==0){
                                        app.activeDocument.activeLayer = app.activeDocument.layers[0];
                                        activeDocument.activeLayer.isBackgroundLayer = false;
                                        var docu = app.activeDocument.name;
                                    }
                                    else{
                                        app.activeDocument.selection.selectAll();
                                        app.activeDocument.selection.copy();
                                        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                                        app.activeDocument = app.documents[docu];

                                        app.activeDocument.activeLayer = app.activeDocument.layers[0];
                                        app.activeDocument.paste();
                                        app.activeDocument.selection.selectAll();
                                        align_center_center();
                                    }

                                 

                        }
                        app.doAction("script_support_actions","script_support_actions");
                        var file_name_making = all_set_folders[setFolderIndex].name+".tif";
                        var full_path_n_name = new File(new Folder(array_of_folders[p]).parent + "/"+"2-Stacked"+"/"+file_name_making);
                        save_tif(full_path_n_name);
                        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
catch(e){
     continue;}

                    }


                }

            }
            
              
         }

         else{alert(" Selected master folder does not have required Processed folder"); 
        }

  

}


//saving functions

function saveJPEG(folderPath,fileName){
    var jpgOptions = new JPEGSaveOptions();
    jpgOptions.quality = 12;
    jpgOptions.embedColorProfile = true;
    jpgOptions.formatOptions = FormatOptions.PROGRESSIVE;
    if(jpgOptions.formatOptions == FormatOptions.PROGRESSIVE){
        jpgOptions.scans = 5};
    jpgOptions.matte = MatteType.NONE;

app.activeDocument.saveAs (new File(folderPath +'/' + fileName+ ".jpg"), jpgOptions);
}
           
         

function getSubFolders(mainFolder){
var temp = [];
    var master_folders = [];
    temp =  mainFolder.getFiles();
    for(var a=0;a<temp.length;a++){
        if(temp[a] instanceof Folder){
            master_folders.push(temp[a]);
        } 
    }
    return master_folders;
}


function ignore_DSFiles(array_check){
    var temp = [];
       
        
        for(var a=0;a<array_check.length;a++){
            if(array_check[a].name!=".DS_Store"){
temp.push(array_check[a]);
            }
        }
        return temp;
    }


function write_log(data){
    var a = new File(path + "/"+ "Log");
    a.open('a');
    a.write(data + "\n");
    a.close(); 

}

function create_log(path){
    var start = "Log for progress is as follows \n Process Started........"
    
var a = new File(path + "/"+ "Log");
a.open('r');
a.write(start + "\n");
a.close();
    
}

function loadingAssets_folderTOArray(path){ 

    var folder_that_contain_files = new Folder(path);
    var images = []; 
    
    images = folder_that_contain_files.getFiles(/\.(tif|TIF|tiff|TIFF)$/i);
    
    return images;
    }






    function save_tif(full_path_n_name){
        

// =======================================================
var idsave = charIDToTypeID( "save" );
var desc54 = new ActionDescriptor();
var idAs = charIDToTypeID( "As  " );
    var desc55 = new ActionDescriptor();
    var idBytO = charIDToTypeID( "BytO" );
    var idPltf = charIDToTypeID( "Pltf" );
    var idIBMP = charIDToTypeID( "IBMP" );
    desc55.putEnumerated( idBytO, idPltf, idIBMP );
    var idEncd = charIDToTypeID( "Encd" );
    var idEncd = charIDToTypeID( "Encd" );
    var idZpEn = charIDToTypeID( "ZpEn" );
    desc55.putEnumerated( idEncd, idEncd, idZpEn );
var idTIFF = charIDToTypeID( "TIFF" );
desc54.putObject( idAs, idTIFF, desc55 );
var idIn = charIDToTypeID( "In  " );
desc54.putPath( idIn, new File( full_path_n_name ) );
var idDocI = charIDToTypeID( "DocI" );
desc54.putInteger( idDocI, 212 );
var idsaveStage = stringIDToTypeID( "saveStage" );
var idsaveStageType = stringIDToTypeID( "saveStageType" );
var idsaveBegin = stringIDToTypeID( "saveBegin" );
desc54.putEnumerated( idsaveStage, idsaveStageType, idsaveBegin );
executeAction( idsave, desc54, DialogModes.NO );

// =======================================================
var idsave = charIDToTypeID( "save" );
var desc56 = new ActionDescriptor();
var idAs = charIDToTypeID( "As  " );
    var desc57 = new ActionDescriptor();
    var idBytO = charIDToTypeID( "BytO" );
    var idPltf = charIDToTypeID( "Pltf" );
    var idIBMP = charIDToTypeID( "IBMP" );
    desc57.putEnumerated( idBytO, idPltf, idIBMP );
    var idEncd = charIDToTypeID( "Encd" );
    var idEncd = charIDToTypeID( "Encd" );
    var idZpEn = charIDToTypeID( "ZpEn" );
    desc57.putEnumerated( idEncd, idEncd, idZpEn );
var idTIFF = charIDToTypeID( "TIFF" );
desc56.putObject( idAs, idTIFF, desc57 );
var idIn = charIDToTypeID( "In  " );
desc56.putPath( idIn, new File( full_path_n_name ) );
var idDocI = charIDToTypeID( "DocI" );
desc56.putInteger( idDocI, 212 );
var idsaveStage = stringIDToTypeID( "saveStage" );
var idsaveStageType = stringIDToTypeID( "saveStageType" );
var idsaveSucceeded = stringIDToTypeID( "saveSucceeded" );
desc56.putEnumerated( idsaveStage, idsaveStageType, idsaveSucceeded );
executeAction( idsave, desc56, DialogModes.NO );


    }


    function testing(){
        mainFolder = Folder.selectDialog("Select the Main Folder that contain all the data");
        var files = []
        var files = mainFolder.getFiles();
        alert(mainFolder instanceof File);
        alert(mainFolder instanceof Folder);
        alert(files[0] instanceof File);
        alert(files[1] instanceof Folder);
    }

function align_center_center(){
    // =======================================================
var idAlgn = charIDToTypeID( "Algn" );
var desc13 = new ActionDescriptor();
var idnull = charIDToTypeID( "null" );
    var ref6 = new ActionReference();
    var idLyr = charIDToTypeID( "Lyr " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idTrgt = charIDToTypeID( "Trgt" );
    ref6.putEnumerated( idLyr, idOrdn, idTrgt );
desc13.putReference( idnull, ref6 );
var idUsng = charIDToTypeID( "Usng" );
var idADSt = charIDToTypeID( "ADSt" );
var idAdCV = charIDToTypeID( "AdCV" );
desc13.putEnumerated( idUsng, idADSt, idAdCV );
executeAction( idAlgn, desc13, DialogModes.NO );

// =======================================================
var idAlgn = charIDToTypeID( "Algn" );
var desc14 = new ActionDescriptor();
var idnull = charIDToTypeID( "null" );
    var ref7 = new ActionReference();
    var idLyr = charIDToTypeID( "Lyr " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idTrgt = charIDToTypeID( "Trgt" );
    ref7.putEnumerated( idLyr, idOrdn, idTrgt );
desc14.putReference( idnull, ref7 );
var idUsng = charIDToTypeID( "Usng" );
var idADSt = charIDToTypeID( "ADSt" );
var idAdCH = charIDToTypeID( "AdCH" );
desc14.putEnumerated( idUsng, idADSt, idAdCH );
executeAction( idAlgn, desc14, DialogModes.NO );

// =======================================================
var idsetd = charIDToTypeID( "setd" );
var desc15 = new ActionDescriptor();
var idnull = charIDToTypeID( "null" );
    var ref8 = new ActionReference();
    var idChnl = charIDToTypeID( "Chnl" );
    var idfsel = charIDToTypeID( "fsel" );
    ref8.putProperty( idChnl, idfsel );
desc15.putReference( idnull, ref8 );
var idT = charIDToTypeID( "T   " );
var idOrdn = charIDToTypeID( "Ordn" );
var idNone = charIDToTypeID( "None" );
desc15.putEnumerated( idT, idOrdn, idNone );
executeAction( idsetd, desc15, DialogModes.NO );


}
    function specific_testing(){
        app.activeDocument.activeLayer = app.activeDocument.layers[1];
        activeDocument.activeLayer.isBackgroundLayer = false;



    }
    