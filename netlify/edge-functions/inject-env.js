export default async function handler(request, context) {
  const url = new URL(request.url);
  
  // Only intercept requests to /env.js
  if (url.pathname === '/env.js') {
    return new Response(`window.ENV = {
      VITE_NOROFF_API_KEY: '${context.env.VITE_NOROFF_API_KEY || ''}'
    };`, {
      headers: {
        'content-type': 'application/javascript',
        'cache-control': 'no-store'
      }
    });
  }

  return context.next();
}
