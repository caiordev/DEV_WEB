import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const exportService = {
  /**
   * Exporta dados do dashboard para Excel
   * @param {Array} data - Dados a serem exportados
   * @param {Object} stats - Estatísticas do dashboard
   */
  exportDashboardToExcel: (data, stats) => {
    try {
      // Preparar dados para exportação
      const exportData = data.map(voucher => ({
        'Número do Voucher': voucher.voucherNumber,
        'Cliente': voucher.customer.name,
        'CPF': voucher.customer.cpf,
        'Telefone': voucher.customer.phone,
        'Email': voucher.customer.email || 'N/A',
        'Data da Venda': new Date(voucher.saleDate).toLocaleDateString('pt-BR'),
        'Valor Total': `R$ ${voucher.totalValue.toFixed(2)}`,
        'Destinos': voucher.voucherTrips.map(vt => vt.trip.destination).join(', ')
      }));

      // Criar planilha
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Vouchers');

      // Adicionar estatísticas em outra aba
      const statsData = [
        { Métrica: 'Total de Vendas', Valor: stats.totalSales },
        { Métrica: 'Receita Total', Valor: `R$ ${stats.totalRevenue.toFixed(2)}` },
        { Métrica: 'Total de Clientes', Valor: stats.totalCustomers },
        { Métrica: 'Total de Destinos', Valor: stats.totalDestinations }
      ];
      const wsStats = XLSX.utils.json_to_sheet(statsData);
      XLSX.utils.book_append_sheet(wb, wsStats, 'Estatísticas');

      // Salvar arquivo
      XLSX.writeFile(wb, `dashboard_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      throw new Error('Erro ao exportar para Excel');
    }
  },

  /**
   * Exporta dados do dashboard para PDF
   * @param {Array} data - Dados a serem exportados
   * @param {Object} stats - Estatísticas do dashboard
   */
  exportDashboardToPDF: (data, stats) => {
    try {
      const doc = new jsPDF();

      // Título
      doc.setFontSize(18);
      doc.text('Relatório de Vendas - TravelFlow', 14, 22);

      // Data de geração
      doc.setFontSize(11);
      doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 30);

      // Estatísticas
      doc.setFontSize(14);
      doc.text('Estatísticas Gerais', 14, 42);
      
      doc.autoTable({
        startY: 48,
        head: [['Métrica', 'Valor']],
        body: [
          ['Total de Vendas', stats.totalSales.toString()],
          ['Receita Total', `R$ ${stats.totalRevenue.toFixed(2)}`],
          ['Total de Clientes', stats.totalCustomers.toString()],
          ['Total de Destinos', stats.totalDestinations.toString()]
        ],
        theme: 'grid',
        headStyles: { fillColor: [25, 118, 210] }
      });

      // Tabela de vouchers
      doc.setFontSize(14);
      doc.text('Vouchers', 14, doc.lastAutoTable.finalY + 15);

      const tableData = data.map(voucher => [
        voucher.voucherNumber,
        voucher.customer.name,
        new Date(voucher.saleDate).toLocaleDateString('pt-BR'),
        `R$ ${voucher.totalValue.toFixed(2)}`,
        voucher.voucherTrips.map(vt => vt.trip.destination).join(', ')
      ]);

      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [['Voucher', 'Cliente', 'Data', 'Valor', 'Destinos']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [25, 118, 210] },
        styles: { fontSize: 9 }
      });

      // Salvar PDF
      doc.save(`dashboard_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      throw new Error('Erro ao exportar para PDF');
    }
  },

  /**
   * Exporta lista de vouchers para Excel
   * @param {Array} vouchers - Lista de vouchers
   */
  exportVouchersToExcel: (vouchers) => {
    try {
      const exportData = vouchers.map(voucher => ({
        'Número': voucher.voucherNumber,
        'Cliente': voucher.customer.name,
        'CPF': voucher.customer.cpf,
        'Telefone': voucher.customer.phone,
        'Email': voucher.customer.email || 'N/A',
        'Data': new Date(voucher.saleDate).toLocaleDateString('pt-BR'),
        'Valor': `R$ ${voucher.totalValue.toFixed(2)}`,
        'Destinos': voucher.voucherTrips.map(vt => vt.trip.destination).join(', ')
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Vouchers');

      XLSX.writeFile(wb, `vouchers_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error('Error exporting vouchers to Excel:', error);
      throw new Error('Erro ao exportar vouchers');
    }
  }
};

export default exportService;
