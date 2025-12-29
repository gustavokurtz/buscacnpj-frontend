import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';

// Interface para os dados retornados pela API
interface CnpjData {
  cnpj: string;
  pais: string | null;
  email: string | null;
  porte: string;
  bairro: string;
  numero: string;
  ddd_fax: string;
  municipio: string;
  logradouro: string;
  cnae_fiscal: number;
  codigo_pais: string | null;
  complemento: string;
  codigo_porte: number;
  razao_social: string;
  nome_fantasia: string;
  capital_social: number;
  ddd_telefone_1: string;
  ddd_telefone_2: string;
  opcao_pelo_mei: boolean | null;
  descricao_porte: string;
  codigo_municipio: number;
  uf: string;
  cep: string;
  qsa: { nome_socio: string }[];
}

// Componente para exibir os detalhes do CNPJ
const CnpjDetails: React.FC<{ cnpjData: CnpjData }> = ({ cnpjData }) => {
  const formatarCapitalSocial = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  const formatarCep = (cep: string) => {
    if (!cep) return '';
    return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  };

  return (
    <div className="mt-8 animate-fade-in">
      <div className="bg-[#1E293B] p-6 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-semibold text-[#E0F2FE] mb-2">{cnpjData.razao_social}</h2>
        <p className="text-[#94A3B8]">{cnpjData.nome_fantasia || "(Nome fantasia não informado)"}</p>
        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#0F172A] text-[#38BDF8] border border-[#38BDF8]/50">
          {cnpjData.cnpj}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Identificação */}
        <div className="bg-[#1E293B] p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-md bg-[#38BDF8]/10 mr-2">
              <svg className="h-5 w-5 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#E0F2FE]">Identificação</h3>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-[#94A3B8]">Porte:</span>
              <p className="font-medium text-[#E0F2FE]">{cnpjData.porte}</p>
            </div>
            <div>
              <span className="text-sm text-[#94A3B8]">Capital Social:</span>
              <p className="font-medium text-[#E0F2FE]">{formatarCapitalSocial(cnpjData.capital_social)}</p>
            </div>
            <div>
              <span className="text-sm text-[#94A3B8]">CNAE Fiscal:</span>
              <p className="font-medium text-[#E0F2FE]">{cnpjData.cnae_fiscal}</p>
            </div>
          </div>
        </div>

        {/* Contato */}
        <div className="bg-[#1E293B] p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-md bg-[#38BDF8]/10 mr-2">
              <svg className="h-5 w-5 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#E0F2FE]">Contato</h3>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-[#94A3B8]">E-mail:</span>
              <p className="font-medium text-[#E0F2FE]">{cnpjData.email || "Não informado"}</p>
            </div>
            <div>
              <span className="text-sm text-[#94A3B8]">Telefone 1:</span>
              <p className="font-medium text-[#E0F2FE]">{cnpjData.ddd_telefone_1 || "Não informado"}</p>
            </div>
            <div>
              <span className="text-sm text-[#94A3B8]">Telefone 2:</span>
              <p className="font-medium text-[#E0F2FE]">{cnpjData.ddd_telefone_2 || "Não informado"}</p>
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="bg-[#1E293B] p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-md bg-[#38BDF8]/10 mr-2">
              <svg className="h-5 w-5 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#E0F2FE]">Endereço</h3>
          </div>
          <div className="space-y-2">
            <div className="bg-[#0F172A]/50 p-3 rounded-md">
              <p className="font-medium text-[#E0F2FE]">
                {cnpjData.logradouro}, {cnpjData.numero}
                {cnpjData.complemento && `, ${cnpjData.complemento}`}
              </p>
              <p className="text-[#94A3B8] mt-1">
                {cnpjData.bairro} - {cnpjData.municipio}/{cnpjData.uf}
              </p>
              <p className="text-[#94A3B8] mt-1">
                CEP: {formatarCep(cnpjData.cep)}
              </p>
            </div>
          </div>
        </div>

        {/* Sócios */}
        <div className="bg-[#1E293B] p-4 rounded-md shadow-md hover:shadow-lg transition duration-300">
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-md bg-[#38BDF8]/10 mr-2">
              <svg className="h-5 w-5 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#E0F2FE]">Quadro Societário</h3>
          </div>
          {cnpjData.qsa && cnpjData.qsa.length > 0 ? (
            <ul className="space-y-2">
              {cnpjData.qsa.map((socio, index) => (
                <li key={index} className="bg-[#0F172A]/50 px-4 py-2 rounded-md flex items-center">
                  <div className="h-6 w-6 rounded-full bg-[#38BDF8]/20 flex items-center justify-center mr-2">
                    <svg className="h-4 w-4 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-[#E0F2FE] text-sm">{socio.nome_socio}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-[#0F172A]/50 p-3 rounded-md">
              <p className="text-[#94A3B8] italic text-sm">Nenhum sócio informado</p>
            </div>
          )}
        </div>

        {/* Informações adicionais */}
        <div className="bg-[#1E293B] p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 md:col-span-2">
          <div className="flex items-center mb-3">
            <div className="p-2 rounded-md bg-[#38BDF8]/10 mr-2">
              <svg className="h-5 w-5 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#E0F2FE]">Informações Adicionais</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="bg-[#0F172A]/50 p-3 rounded-md">
              <span className="text-sm text-[#94A3B8]">País:</span>
              <p className="font-medium text-[#E0F2FE] text-sm">{cnpjData.pais || "Brasil"}</p>
            </div>
            <div className="bg-[#0F172A]/50 p-3 rounded-md">
              <span className="text-sm text-[#94A3B8]">Código País:</span>
              <p className="font-medium text-[#E0F2FE] text-sm">{cnpjData.codigo_pais || "Não informado"}</p>
            </div>
            <div className="bg-[#0F172A]/50 p-3 rounded-md">
              <span className="text-sm text-[#94A3B8]">Opção pelo MEI:</span>
              <p className="font-medium text-[#E0F2FE] text-sm">{cnpjData.opcao_pelo_mei === true ? "Sim" : "Não"}</p>
            </div>
            <div className="bg-[#0F172A]/50 p-3 rounded-md">
              <span className="text-sm text-[#94A3B8]">Descrição Porte:</span>
              <p className="font-medium text-[#E0F2FE] text-sm">{cnpjData.descricao_porte || "Não informado"}</p>
            </div>
            <div className="bg-[#0F172A]/50 p-3 rounded-md">
              <span className="text-sm text-[#94A3B8]">Código Porte:</span>
              <p className="font-medium text-[#E0F2FE] text-sm">{cnpjData.codigo_porte}</p>
            </div>
            <div className="bg-[#0F172A]/50 p-3 rounded-md">
              <span className="text-sm text-[#94A3B8]">Código Município:</span>
              <p className="font-medium text-[#E0F2FE] text-sm">{cnpjData.codigo_municipio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// URL base da API
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Home = () => {
  const [cnpj, setCnpj] = useState('');
  const [cnpjData, setCnpjData] = useState<CnpjData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Formata o CNPJ durante a digitação (XX.XXX.XXX/XXXX-XX)
  const formatarCnpj = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '').slice(0, 14);
    return apenasNumeros
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  };

  // Manipula a mudança no input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarCnpj(e.target.value);
    setCnpj(valorFormatado);
  };

  // Valida o formato do CNPJ
  const validarCnpj = (cnpjNumerico: string): boolean => {
    if (cnpjNumerico.length !== 14) {
      return false;
    }
    return true;
  };

  // Consulta a API
  const consultarCnpj = async (e: React.FormEvent) => {
    e.preventDefault();

    const cnpjNumerico = cnpj.replace(/\D/g, '');

    if (!validarCnpj(cnpjNumerico)) {
      setError('CNPJ inválido. Verifique o formato.');
      return;
    }

    setLoading(true);
    setError(null);
    setCnpjData(null); // Limpa os dados anteriores

    try {
      const response = await axios.get(`https://buscacnpj.onrender.com/cnpj/${cnpjNumerico}`);
      setCnpjData(response.data);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError('CNPJ não encontrado.');
      } else {
        setError('Erro ao consultar CNPJ. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  const limparConsulta = () => {
    setCnpj('');
    setCnpjData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#E0F2FE]">
      <Head>
        <title>Consulta de CNPJ | Portal Empresarial</title>
        <meta name="description" content="Sistema moderno de consulta de CNPJ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-4">
            <svg className="h-8 w-8 text-[#38BDF8] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-3xl font-bold text-[#E0F2FE]">
              Consulta CNPJ
            </h1>
          </div>
          <p className="text-lg text-[#94A3B8] max-w-xl text-center">
            Sistema avançado para consulta de dados empresariais com base no CNPJ
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#1E293B] rounded-md shadow-lg overflow-hidden">
          <div className="p-6">
            <form onSubmit={consultarCnpj} className="space-y-4">
              <div className="relative">
                <label htmlFor="cnpj" className="block text-md font-medium text-[#94A3B8] mb-2">
                  Digite o CNPJ da empresa
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    id="cnpj"
                    type="text"
                    value={cnpj}
                    onChange={handleInputChange}
                    placeholder="00.000.000/0000-00"
                    maxLength={18}
                    className="block w-full pl-10 pr-3 py-3 bg-[#0F172A] border border-[#38BDF8]/40 focus:border-[#38BDF8] rounded-md text-[#E0F2FE] placeholder-[#94A3B8]/70 focus:ring-2 focus:ring-[#38BDF8]/20 focus:outline-none transition duration-300 text-lg"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 relative overflow-hidden bg-[#38BDF8] hover:bg-[#2563EB] text-[#0F172A] font-medium py-3 px-6 rounded-md transition duration-300 shadow-md hover:shadow-lg disabled:opacity-70 group"
                >
                  <span className="relative z-10 flex items-center justify-center text-lg">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Consultando...
                      </>
                    ) : (
                      <>
                        Consultar CNPJ
                        <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>

                {cnpjData && (
                  <button
                    type="button"
                    onClick={limparConsulta}
                    className="bg-[#4B5563]/50 hover:bg-[#374151]/50 text-[#E0F2FE] font-medium py-3 px-6 rounded-md transition duration-300 border border-[#4B5563]/50"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </form>

            {error && (
              <div className="mt-4 bg-[#DC2626]/20 border-l-4 border-[#DC2626] p-3 rounded-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-[#DC2626]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <p className="text-[#F87171] font-medium text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {cnpjData && <CnpjDetails cnpjData={cnpjData} />}
          </div>
        </div>
      </main>

      <footer className="mt-8 py-4 text-center text-[#94A3B8] text-sm">
        <p>© {new Date().getFullYear()} Portal Empresarial | Sistema de Consulta CNPJ</p>
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Home;
