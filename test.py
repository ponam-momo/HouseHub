import urllib.request
import json

url = "http://localhost:3000/api/auth/register"
data = {
    "name": "Test User",
    "email": "test@test.com",
    "password": "123456",
    "phone": "01700000000",
    "role": "tenant"
}

req = urllib.request.Request(
    url,
    data=json.dumps(data).encode('utf-8'),
    headers={'Content-Type': 'application/json'},
    method='POST'
)

try:
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(e.read().decode('utf-8'))