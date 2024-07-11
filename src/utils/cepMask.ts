export default function formatCEP(cep: string): string {
    let cleanCep = cep.replace(/\D/g, '');

    return cleanCep.replace(/(\d{5})(\d{3})/, '$1-$2');
}
