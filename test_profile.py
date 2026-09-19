import urllib.request
import json

login_url = "http://localhost:3000/api/auth/login"
login_data = {
    "email": "test@test.com",
    "password": "123456"
}

req = urllib.request.Request(
    login_url,
    data=json.dumps(login_data).encode('utf-8'),
    headers={'Content-Type': 'application/json'},
    method='POST'
)
response = urllib.request.urlopen(req)
result = json.loads(response.read().decode('utf-8'))
token = result['token']
print("Token received:", token[:20], "...")

profile_url = "http://localhost:3000/api/user/profile"
req2 = urllib.request.Request(
    profile_url,
    headers={'Authorization': f'Bearer {token}'},
    method='GET'
)

try:
    response2 = urllib.request.urlopen(req2)
    print("Profile:", response2.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("Error body:", e.read().decode('utf-8'))

# Profile Update Test
update_url = "http://localhost:3000/api/user/profile"
update_data = {
    "name": "Updated Name",
    "phone": "01900000000"
}

req3 = urllib.request.Request(
    update_url,
    data=json.dumps(update_data).encode('utf-8'),
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    },
    method='PUT'
)
try:
    response3 = urllib.request.urlopen(req3)
    print("Update:", response3.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("Update Error:", e.read().decode('utf-8'))