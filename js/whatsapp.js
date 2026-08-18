(function(){
  const cfg = window.ATERRA_CONFIG;
  const formatIDR = value => 'Rp ' + new Intl.NumberFormat('id-ID').format(value);
  window.AterraWhatsApp = {
    formatIDR,
    buildMessage(values){
      const lines = [
        'Halo Aterra, saya ingin melakukan pemesanan.', '',
        `Nama Lengkap: ${values.name}`,
        `No. WhatsApp: ${values.phone}`,
        `Jumlah Mesin MOVA: ${values.quantity}`,
        `Total (belum termasuk ongkir): ${formatIDR(values.total)}`,
        `Alamat Pengiriman: ${values.address}`
      ];
      const extras=[];
      if(values.refill) extras.push('- Saya juga mau penawaran paket botol & lid isi ulang');
      if(values.alta) extras.push('- Saya tertarik mesin otomatis ALTA (minta penawaran)');
      if(extras.length) lines.push('', 'Tambahan:', ...extras);
      return lines.join('\n');
    },
    link(message){ return `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(message)}`; }
  };
})();
