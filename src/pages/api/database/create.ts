import type { APIRoute } from "astro";
import { supabase } from '@/lib/supabase';

export const POST: APIRoute = async ({ request }) => {

  let dataDB = []
  try {

    if (request.headers.get("Content-Type") === "application/json") {

    } else {
      return new Response("不明なデータ形式です", { status: 400 });
    }

    const { data, error } = await supabase
      .from('todo')
      .insert([
        { todo: 'someValue' },
      ])
      .select()

    if (error) {
      return new Response(error.message, { status: 400 });
    } else {
      dataDB = data
    }

  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    } else {
      return new Response("Unknown error occurred", { status: 500 });
    }
  }

  return new Response(
    JSON.stringify({
      todo: dataDB
    })
  );
};