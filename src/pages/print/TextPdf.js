import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Template = () => {
  const outputPdf = () => {
    exportPDF();
  };

  const exportPDF = () => {
    const input = document.getElementById("content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 1, 1);
      pdf.save("File.pdf");
    });
  };

  return (
    <div>
      <button onClick={outputPdf}>Click vào để xuất file</button>

      <div
        id="content"
        style={{
          position: "fixed",
          left: "100vw",
          width: "790px",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "50%",
              border: "solid 1px #000",
              padding: "4px",
              borderRight: "none",
            }}
          >
            Testtttttttttttttttttttttttttt
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              border: "solid 1px #000",
              padding: "4px",
            }}
          >
            Testtttttttttttttttttttttttttt
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "50%",
              background: "#fff",
              borderLeft: "solid 1px #000",
              padding: "4px",
            }}
          >
            <span
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#000",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              01
            </span>
            <span
              style={{
                display: "flex",
                fontWeight: 600,
                marginLeft: "8px",
                color: "#000",
              }}
            >
              Mã khách hàng:
            </span>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              background: "#fff",
              borderLeft: "solid 1px #000",
              borderRight: "solid 1px #000",

              padding: "4px",
            }}
          >
            <span
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#000",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              02
            </span>
            <span
              style={{
                display: "flex",
                fontWeight: 600,
                marginLeft: "8px",
                color: "#000",
              }}
            >
              Mã tham chiếu
            </span>
          </div>
        </div>
        {/* <div
             style={{
               display: "flex",
               width: "100%",
             }}
           >
             <div
               style={{
                 width: "50%",
                 padding: "4px",
                 border: "solid 1px #000",
                 borderRight: "none",
               }}
             >
               <div className="breakOneLine">
                 Người
                 gửi:&nbsp;....................................................................................................................................................................................................................................................................................................................................
               </div>
               <div className="breakOneLine">
                 Điện
                 thoại:&nbsp;...................................................................................................................................................................................................................................................
               </div>
               <div className="breakTwoLine">
                 Địa&nbsp;chỉ:&nbsp;.....................................................................................................................................................................................................................................................................................................................................................................................................................
               </div>
             </div>
             <div
               style={{
                 width: "50%",
                 padding: "4px",
                 border: "solid 1px #000",
               }}
             >
               <div className="breakOneLine">
                 Người
                 nhận:&nbsp;....................................................................................................................................................................................................................................................................................................................................
               </div>
               <div className="breakOneLine">
                 Điện
                 thoại:&nbsp;....................................................................................................................................................................................................................................................................................................................................
               </div>
               <div className="breakTwoLine">
                 Địa&nbsp;chỉ:&nbsp;....................................................................................................................................................................................................................................................................................................................................
               </div>
             </div>
           </div> */}
        <div
          style={{
            display: "flex",
            width: "100%",
            background: "#777777",
            padding: "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "75%",
              background: "#fff",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              width: "25%",
              background: "#fff",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Template;
