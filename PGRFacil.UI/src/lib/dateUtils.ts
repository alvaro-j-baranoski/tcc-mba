export function formatDate(dateString: string): string {
  const data = new Date(dateString);
  const agora = new Date();
  const diferencaMs = agora.getTime() - data.getTime();
  const segundos = Math.floor(diferencaMs / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  if (segundos < 60) {
    return "agora mesmo";
  }

  if (minutos < 60) {
    return minutos === 1 ? "1 minuto atrás" : `${minutos} minutos atrás`;
  }

  if (horas < 24) {
    return horas === 1 ? "1 hora atrás" : `${horas} horas atrás`;
  }

  if (dias < 7) {
    return dias === 1 ? "1 dia atrás" : `${dias} dias atrás`;
  }

  if (dias < 30) {
    const semanas = Math.floor(dias / 7);
    return semanas === 1 ? "1 semana atrás" : `${semanas} semanas atrás`;
  }

  if (dias < 365) {
    const meses = Math.floor(dias / 30);
    return meses === 1 ? "1 mês atrás" : `${meses} meses atrás`;
  }

  const anos = Math.floor(dias / 365);
  return anos === 1 ? "1 ano atrás" : `${anos} anos atrás`;
}
