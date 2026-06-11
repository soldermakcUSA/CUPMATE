import { GET as getScores } from "../route";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ScoreDetailContext = {
  params: Promise<{
    eventId: string;
  }>;
};

export async function GET(_request: Request, context: ScoreDetailContext) {
  const { eventId } = await context.params;
  return getScores(new Request(`https://cupmate.us/api/scores?eventId=${encodeURIComponent(eventId)}`));
}
