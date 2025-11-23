Video com tour e apresentação do projeto

https://www.youtube.com/watch?v=0dUnNEoIhlE


GUIA DE INSTALAÇÃO
Como iniciar o projeto
Pré-requisitos
Antes de começar, você precisa ter instalado:
Node.js (versão LTS recomendada)
npm (vem junto com o Node)
ou
yarn (opcional)
Verifique se está instalado:
node -v
npm -v
Clonar o repositório
Depois entre na pasta
Instalar dependências
Se estiver usando npm:
npm install
Ou se usa yarn:
yarn
Rodar o projeto
Se estiver usando React com Vite
npm run dev
ou
yarn dev
O servidor subirá normalmente em:
http://localhost:5173
Se estiver usando Create React App
npm start
ou
yarn start
O projeto será iniciado em:
http://localhost:3000



DOCUMENTAÇÃO

QuickFood Tech – Arquitetura de Software
Versão: Final – 1.0
Status: Concluído
1. Executive Summary
1.1 Problema de Negócio
O mercado de delivery brasileiro cresce rapidamente, mas é dominado por grandes players como o iFood. Restaurantes de menor porte enfrentam:
Altas taxas.
Baixa visibilidade.
Falta de personalização em promoções.
Experiência de entrega pouco confiável.
1.2 Proposta de Valor
O QuickFood Tech busca oferecer:
Plataforma com taxas mais competitivas.
App desenvolvido em React com experiência fluida para usuários.
Possibilidade futura de tracking em tempo real.
Gestão de promoções e cupons.
Base escalável para evolução futura.
1.3 Objetivos do Projeto
Principal
Lançar um MVP funcional em 6 meses.
Secundários (planejados para evoluir posteriormente)
Suportar grandes volumes de pedidos.
Geolocalização precisa (< 10m).
Pagamentos integrados (Pix, cartão, carteiras digitais).
Dashboard web para restaurantes.
1.4 Escopo Realizado no Projeto
Como decidido no processo de desenvolvimento, somente o frontend em React foi implementado, destacando:
Aplicação React funcional.
Telas principais operacionais.
Fluxo de navegação estruturado.
Estrutura pronta para futura integração com backend.
2. Stakeholder Analysis
Stakeholder	Interesse	Influência	Expectativas	Engajamento
Clientes	Alto	Alto	App com boa experiência e promoções	Entrevistas e testes
Restaurantes	Alto	Alto	Visibilidade e painel simples	Suporte e onboarding
Entregadores	Médio	Médio	Rotas claras e pagamentos rápidos	Canal direto de suporte
Investidores	Alto	Alto	Crescimento e escalabilidade	Relatórios e KPIs
Stakeholder Principal (PO)
Nome: Carlos Eduardo
Papel: Diretor de Produto
Preocupações: Prazo, diferenciação competitiva e escalabilidade futura.
3. Requisitos de Alto Nível
3.1 Requisitos Funcionais (planejados)
ID	Requisito	Prioridade
RF001	Cadastro/Login para clientes, restaurantes e entregadores	Alta
RF002	Realizar pedidos e pagamentos	Alta
RF003	Tracking em tempo real	Alta
RF004	Sistema de promoções e cupons	Média
RF005	Dashboard para restaurantes	Alta
3.2 Requisitos Não-Funcionais (planejados)
ID	Atributo	Métrica	Prioridade
RNF001	Performance	Resposta < 200ms	Alta
RNF002	Escalabilidade	Suporte a 100k pedidos/dia	Alta
RNF003	Disponibilidade	99.9% uptime	Alta
RNF004	Segurança	Zero vazamentos	Alta
RNF005	Usabilidade	Fluxos em até 3 cliques	Média
Status Real: devido à ausência de backend no MVP, parte dos requisitos funcionais permanece planejada para versões futuras.
4. Contexto, Tecnologias e Restrições
4.1 Tecnologias Utilizadas
Frontend Web/Mobile: React (único componente desenvolvido no MVP)
Infraestrutura: ambiente local de desenvolvimento
Sem backend implementado
Sem banco de dados
Sem integrações externas
4.2 Restrições
Equipe reduzida (4 desenvolvedores)
Tempo limitado (6 meses)
MVP precisou priorizar a interface e navegação
Backend e integrações permanecem como evolução futura
4.3 Premissas Consideradas
Usuários possuem dispositivos modernos
Solução poderá ser conectada a backends futuros
Arquitetura pensada para expansão
5. Riscos do Projeto
Risco	Prob	Impacto	Score	Mitigação
Ausência de backend no prazo	Alta	Alto	Crítico	Priorizar entrega do frontend
Escalabilidade futura	Média	Alto	Alto	Arquitetar componentes desacoplados
Atraso no MVP	Média	Alto	Alto	Estrutura enxuta
Equipe reduzida	Alta	Médio	Médio	Foco nas funcionalidades essenciais
6. Critérios de Sucesso & Métricas
Meta definida
MVP entregue no prazo com front funcional
Navegação e experiência implementadas
Estrutura pronta para acoplamento de API
Métricas Futuras Planejadas
Métrica	Target
Sucesso em pedidos	> 98%
Tempo de resposta	< 200ms
Uptime	99.9%
NPS	> 70
(algumas não aplicáveis na ausência de backend)
7. Roadmap Original
Mês	Atividade
1	Setup inicial e estrutura React
2-3	Fluxos principais (login, pedidos, navegação)
4-5	Telas adicionais
6	Preparação para integração e entrega final
Backend, tracking e pagamentos ficaram para versões futuras.
8. Team Structure
Papel	Responsável	Responsabilidades
Líder Técnico	Carlos Eduardo	Coordenação técnica
Dev Frontend	Matheus Gabriel	Implementação React
Dev Frontend	João Rafael	Navegação, telas e integrações futuras
QA & Documentação	Flávio Gabriel	Testes e artefatos
9. Orçamento Estimado
Item	Valor
Desenvolvimento (4 devs × R$ 3.000 × 6 meses)	R$ 72.000,00
Outros Custos (domínio, recursos mínimos)	R$ 1.200,00
Infraestrutura cloud estimada (AWS), porém não utilizada nesta versão:
~R$ 7.200 para 6 meses (planejado)
Total Estimado
≈ R$ 73.200 – R$ 80.000
10. Architecture Decision Records (ADRs)
ADR-001 – Frontend em React
Decisão: Usar React como base do MVP.
Justificativa:
Familiaridade da equipe.
Desenvolvimento rápido.
Permite evolução futura para mobile e web.
Consequência:
Entrega funcional mesmo sem backend.
Integrações futuras com APIs facilitadas.
ADRs Previstas mas Não Aplicadas
As seguintes decisões foram mantidas no documento, mas não implementadas, uma vez que o backend não foi concluído:
ADR-002 – Backend em Laravel
ADR-003 – PostgreSQL para banco de dados
ADR-004 – Hospedagem AWS
11. Diagramas de Arquitetura (Versão Atual)
11.1 Contexto Real do MVP
Usuário
   ↓
Aplicação React (Frontend)
   ↓
— Backend ausente no MVP —
11.2 Containers Implementados
React App
Telas principais
Navegação estruturada
Pronto para conectar API REST futura
12. Próximos Passos
Implementar backend (Laravel, Node ou similar).
Integrar banco de dados relacional.
Adicionar tracking e geolocalização.
Criar módulo de pagamentos.
Criar dashboard web para restaurantes.
13. Lições Aprendidas
A restrição de tempo e equipe reduziu o escopo para o frontend.
Garantir uma base sólida de UI permite evolução incremental.
Documentar decisões facilita retomar o desenvolvimento no futuro.
