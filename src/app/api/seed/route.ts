import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Rota de seed — acesse /api/seed no navegador para popular os motoristas
async function seedMotoristas() {
  const motoristas = [
    { nome: "Leandro Bernardes", corridasMes: 469, status: "ativo" },
    { nome: "Eliesio Lima Lustosa", corridasMes: 291, status: "ativo" },
    { nome: "Sinielson Gonçalves Da Costa", corridasMes: 291, status: "ativo" },
    { nome: "Nilson Da Costa E Silva", corridasMes: 286, status: "ativo" },
    { nome: "Itamar Alves Lobo", corridasMes: 243, status: "ativo" },
    { nome: "José André Pereira De Oliveira", corridasMes: 180, status: "ativo" },
    { nome: "Jane Kelly Guimarães Souza", corridasMes: 158, status: "ativo" },
    { nome: "Eneivaldir Carneiro SA Júnior", corridasMes: 155, status: "ativo" },
    { nome: "Rodrigo Martins De Araujo", corridasMes: 149, status: "ativo" },
    { nome: "Alisson Patrick Laranjeira De Sousa Silva", corridasMes: 122, status: "ativo" },
    { nome: "Eudes Costa Bueno", corridasMes: 109, status: "ativo" },
    { nome: "Valdiron Moreira Teles", corridasMes: 70, status: "ativo" },
    { nome: "Palmeron Cunha Catanhede", corridasMes: 68, status: "ativo" },
    { nome: "Joao Batista Nascimento", corridasMes: 56, status: "ativo" },
    { nome: "Alexandre Silva De Sousa", corridasMes: 50, status: "ativo" },
    { nome: "Junior Ferreira Fernandes", corridasMes: 45, status: "ativo" },
    { nome: "Eduardo Araujo De Oliveira", corridasMes: 40, status: "ativo" },
    { nome: "Valdemar Ferreira Lima", corridasMes: 36, status: "ativo" },
    { nome: "Mariene Machado da Silva", corridasMes: 32, status: "ativo" },
    { nome: "Joel de Jesus", corridasMes: 31, status: "ativo" },
    { nome: "Wdson Francisco Abreu Dos Santos", corridasMes: 28, status: "ativo" },
    { nome: "Welliton Sousa Vasconcelos", corridasMes: 2, status: "ativo" },
    { nome: "Junior Cabeleira", corridasMes: 1, status: "ativo" },
    { nome: "Antonio Silva E Silva", corridasMes: 0, status: "alerta" },
    { nome: "Billy Cefas", corridasMes: 0, status: "alerta" },
    { nome: "Karita Silva", corridasMes: 0, status: "alerta" },
    { nome: "Khaled Ikene (Marco)", corridasMes: 0, status: "alerta" },
    { nome: "Manoelsantos Xavier", corridasMes: 0, status: "alerta" },
  ];

  try {
    let created = 0;
    let skipped = 0;

    for (const m of motoristas) {
      // Verifica se já existe pelo nome para evitar duplicatas
      const existe = await prisma.motorista.findFirst({
        where: { nome: m.nome },
      });

      if (existe) {
        // Atualiza as corridas se já existe
        await prisma.motorista.update({
          where: { id: existe.id },
          data: { corridasMes: m.corridasMes, status: m.status },
        });
        skipped++;
      } else {
        await prisma.motorista.create({
          data: {
            nome: m.nome,
            corridasMes: m.corridasMes,
            status: m.status,
            ativo: true,
            pontos: 0,
          },
        });
        created++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seed concluído! ${created} criados, ${skipped} atualizados.`,
      total: motoristas.length,
    });
  } catch (error: any) {
    console.error("Erro no seed:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return seedMotoristas();
}

export async function POST() {
  return seedMotoristas();
}
