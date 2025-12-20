function exportPDF(){
  html2pdf()
   .set({ filename: 'MF_Factsheet.pdf' })
   .from(document.getElementById('factsheet'))
   .save();
}
