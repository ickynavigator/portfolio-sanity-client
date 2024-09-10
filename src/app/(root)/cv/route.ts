import { CVReference } from '~/groq/queries';
import { getUrlFromId } from '~/sanity/sanity.lib';
import { getClient } from '~/sanity/sanity.server';

export async function GET() {
  try {
    const ref = await getClient().fetch(CVReference);

    if (!ref) return new Response('No CV found', { status: 404 });

    const url = getUrlFromId(ref);

    return new Response(null, { status: 302, headers: { Location: url } });
  } catch (error) {
    console.error(error);

    const message =
      error instanceof Error
        ? error.message
        : 'An error occured while getting the CV';

    return new Response(message, { status: 500 });
  }
}
