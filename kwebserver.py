import http.server
import time


DOCUMENT_ROOT = "./htdocs/"
STOP_KWS = "./stop_kws"

class KRequestHandler(http.server.SimpleHTTPRequestHandler):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, directory=DOCUMENT_ROOT, **kwargs)

class KHTTPServer(http.server.HTTPServer):
  def __init__(self, port=8080, reqHandler=KRequestHandler):
    super().__init__(("", port), reqHandler)

if __name__ == "__main__":
  while True:
    try:
      KHTTPServer().serve_forever()
    except Exception as err:
      print(err)
      time.sleep(10)
