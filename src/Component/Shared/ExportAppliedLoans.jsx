// import React from "react";

import axios from "axios";

// import axios from "axios";
function ExportAppliedLoans(){
  const handleExport = async() =>{
    try{
      const response = await axios.get(
        "https://lonklinkserver.vercel.app/export-applied-loans",
        {
          responseType: 'blob',
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href=url;
      link.setAttribute("download", "applied_loans.csv");
      document.body.appendChild(link);
      link.click();
    link.remove();

      } catch (error) {
        alert("Failed to export");
      }
  };

  return (
    <div className="p-4">
      <button onClick={handleExport} className="btn btn-info btn-xs">Export Applied Loans CSV</button>
    </div>
  )
}

// function ExportAppliedLoans() {

//   const handleExport = async () => {
//     try {
//       const response = await axios.get(
//         "https://lonklinkserver.vercel.app/export-applied-loans",
//         {
//           responseType: "blob", // important for file download
//         }
//       );

//       // Create a blob link to download
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "applied_loans.csv"); // filename
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error("Error exporting applied loans:", error);
//       alert("Failed to export applied loans");
//     }
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={handleExport}
//         className="btn btn-info btn-xs"
//       >
//         Export Applied Loans CSV
//       </button>
//     </div>
//   );
// }

export default ExportAppliedLoans;
