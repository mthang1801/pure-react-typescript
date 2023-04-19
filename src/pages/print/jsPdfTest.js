import React from "react";
// import html2canvas from "html2canvas";
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
        <div style={{ fontSize: "5px", paddingBottom: "15px" }}>
          Nội dung trong này sẽ được xuất ra file pdf Nội dung trong này sẽ được
          xuất ra file pdfNội dung trong này sẽ được xuất ra file pdfNội dung
          trong này sẽ được xuất ra file pdf
        </div>
      </div>
    </div>
  );
};

export default Template;
