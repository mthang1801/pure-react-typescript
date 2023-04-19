import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface EditProp {
  height?: number;
  disabled?: boolean;
  initialValue?: string;
}

const DDEditor: React.FC<EditProp & Record<string, any>> = ({
  height = 500,
  disabled,
  initialValue,
  ...rest
}) => {
  return (
    <Editor
      apiKey="jtpz02pz1alo4bc3q01ccoyc48zwo2kc6sg6ipmtq42fmljz"
      initialValue={initialValue}
      disabled={disabled}
      init={{
        height: 500,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        menubar: 'insert table',
        automatic_uploads: true,
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
      
          /*
            Note: In modern browsers input[type="file"] is functional without
            even adding it to the DOM, but that might not be the case in some older
            or quirky browsers like IE, so you might want to add it to the DOM
            just in case, and visually hide it. And do not forget do remove it
            once you do not need it anymore.
          */
      
          input.onchange = function () {
            // var file = this.files[0];
      
            // var reader = new FileReader();
            // reader.onload = function () {
            //   /*
            //     Note: Now we need to register the blob in TinyMCEs image blob
            //     registry. In the next release this part hopefully won't be
            //     necessary, as we are looking to handle it internally.
            //   */
            //   var id = 'blobid' + (new Date()).getTime();
            //   var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
            //   var base64 = reader.result.split(',')[1];
            //   var blobInfo = blobCache.create(id, file, base64);
            //   blobCache.add(blobInfo);
      
            //   /* call the callback and populate the Title field with the file name */
            //   cb(blobInfo.blobUri(), { title: file.name });
            // };
            // reader.readAsDataURL(file);
          };
      
          input.click();
        },
        file_picker_types: 'file image media',            
        toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor image link media | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help preview table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
      {...rest}
    />
  );
};
export default DDEditor;
