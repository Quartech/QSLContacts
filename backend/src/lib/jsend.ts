import restify from 'restify';

/**
 * @param {restify.Response} res
 * @param {*} body
 */
const formatError = (res: restify.Response, body: any) => {
  const isClientError = res.statusCode >= 400 && res.statusCode < 500;
  if (isClientError) {
    return {
      status: 'error',
      message: body.message,
      code: body.code
    };
  } else {
    const isDebugMode = process.env.NODE_ENV === 'development';

    return {
      status: 'error',
      message: isDebugMode ? body.message : 'Internal Server Error',
      code: isDebugMode ? body.code : 'INTERNAL_SERVER_ERROR',
      data: isDebugMode ? body.stack : undefined
    };
  }
}

/**
 * @param {restify.Response} res
 * @param {*} body
 */
const formatSuccess = (res: restify.Response, body: any) => {
  if (body.data && body.pagination) {
    return {
      status: 'success',
      data: body.data,
      pagination: body.pagination,
    };
  }

  return {
    status: 'success',
    data: body
  };
}

/**
 * Main function - overrides the default Restify formatter for `content-type` of `application/json`
 * @param {restify.Request} req
 * @param {restify.Response} res
 * @param {*} body
 */
export default function formatJSend(req: restify.Request, res: restify.Response, body: any) {
  let response;
  if (body instanceof Error) {
    response = formatError(res, body);
  } else {
    response = formatSuccess(res, body);
  }

  response = JSON.stringify(response);
  res.header('Content-Length', Buffer.byteLength(response));
  res.header('Content-Type', 'application/json');

  return response;
}
