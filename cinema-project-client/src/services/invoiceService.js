import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateInvoice = (reservationDetails) => {
  const doc = new jsPDF();
  const { selectedSeats, totalAmount, customerName, screeningInfo } = reservationDetails;

  // Logo ve başlık
  doc.setFontSize(20);
  doc.text('Cinema Bilet Faturası', 105, 20, { align: 'center' });
  
  // Müşteri bilgileri
  doc.setFontSize(12);
  doc.text(`Müşteri: ${customerName}`, 20, 40);
  doc.text(`Tarih: ${new Date().toLocaleDateString()}`, 20, 50);
  doc.text(`Fatura No: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 20, 60);

  // Film ve seans bilgileri
  doc.text('Film Bilgileri:', 20, 80);
  doc.setFontSize(11);
  doc.text(`Film: ${screeningInfo.movieName}`, 30, 90);
  doc.text(`Salon: ${screeningInfo.hallName}`, 30, 100);
  doc.text(`Tarih/Saat: ${new Date(screeningInfo.screeningTime).toLocaleString()}`, 30, 110);

  // Koltuk bilgileri
  doc.autoTable({
    startY: 130,
    head: [['Koltuk No', 'Bilet Fiyatı']],
    body: selectedSeats.map(seat => [
      seat,
      `${(totalAmount / selectedSeats.length).toFixed(2)} TL`
    ]),
    foot: [['Toplam', `${totalAmount} TL`]],
    theme: 'grid',
    headStyles: { fillColor: [66, 66, 66] },
    footStyles: { fillColor: [66, 66, 66] }
  });

  // Alt bilgi
  doc.setFontSize(10);
  doc.text('Bu bir elektronik faturadır.', 20, doc.internal.pageSize.height - 20);

  // PDF'i indir
  doc.save(`fatura_${new Date().getTime()}.pdf`);
}; 