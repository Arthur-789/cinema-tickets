import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class IngressoService {

  async gerarPDF(dados: any) {
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.left = '-9999px';
    div.innerHTML = this.getTemplate(dados);
    document.body.appendChild(div);

    try {
      const canvas = await html2canvas(div, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`Ingresso_${dados.filmeTitulo || 'CineApp'}.pdf`);
    } finally {
      document.body.removeChild(div);
    }
  }

  private getTemplate(dados: any): string {
    const filme = dados.filmeTitulo || 'Filme';
    const sala = dados.salaNome || 'Sala Principal';
    const data = dados.data || '--/--/----';
    const hora = dados.horario || '--:--';
    const assentos = Array.isArray(dados.assentosCodigos) 
                     ? dados.assentosCodigos.join(', ') 
                     : (dados.assentosCodigos || 'N/A');
    
    const voucher = dados.codigo_voucher || dados.voucher || 'ERRO-VOUCHER';

    return `
      <div style="width: 500px; padding: 40px; border: 4px dashed #c91432; background: white; font-family: 'Arial', sans-serif;">
        <div style="text-align: center; border-bottom: 3px solid #ffc107; padding-bottom: 20px;">
          <h1 style="color: #c91432; margin: 0; font-size: 32px; letter-spacing: -1px;">CINE APP</h1>
          <p style="color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-top: 5px;">Comprovante de Entrada</p>
        </div>
        
        <div style="margin-top: 30px;">
          <h2 style="color: #333; font-size: 26px; margin-bottom: 10px; border-left: 5px solid #ffc107; padding-left: 15px;">${filme}</h2>
          <div style="color: #444; font-size: 16px; line-height: 1.8; margin-left: 20px;">
            <p style="margin: 5px 0;"><strong style="color: #c91432;">SALA:</strong> ${sala}</p>
            <p style="margin: 5px 0;"><strong style="color: #c91432;">DATA E HORA:</strong> ${data} às ${hora}</p>
            <p style="margin: 5px 0;"><strong style="color: #c91432;">ASSENTOS:</strong> ${assentos}</p>
          </div>
        </div>

        <div style="margin-top: 40px; background: #fffbef; padding: 30px; border-radius: 15px; text-align: center; border: 2px solid #ffc107; position: relative;">
          <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: white; padding: 0 10px; color: #ffc107; font-size: 10px; font-weight: bold;">VALIDAÇÃO DIGITAL</div>
          <p style="margin: 0; color: #888; font-size: 12px; font-weight: bold; text-transform: uppercase;">Código do Voucher</p>
          <h3 style="margin: 15px 0; color: #c91432; font-size: 32px; letter-spacing: 5px; font-family: 'Courier New', monospace; font-weight: 900;">
            ${voucher}
          </h3>
          <p style="margin: 0; color: #666; font-size: 12px; font-style: italic;">Apresente este QR-Code ou código na portaria.</p>
        </div>
        
        <div style="margin-top: 30px; text-align: center; color: #bbb; font-size: 10px;">
          Emitido em: ${new Date().toLocaleString('pt-BR')}
        </div>
      </div>
    `;
  }
}