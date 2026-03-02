# Render Deployment (Multiplayer Backend)

This project includes `render.yaml` for one-click Render provisioning.

## What Gets Deployed

- Service type: Web Service (Node)
- Runtime: Node 20
- Plan: Free
- Start command: `npm start`
- Health check: `/healthz`

## After Render Creates The Service

1. Copy your Render service URL (for example: `https://lumina-ascendant-multiplayer.onrender.com`).
2. Point the game frontend to that URL using one of these methods:
   - Set `<meta name="lumina-mp-url" content="https://YOUR-SERVICE.onrender.com">` in `index.html`
   - Or launch the frontend with query override: `?mp=https://YOUR-SERVICE.onrender.com`

## Notes

- Render free services can spin down after inactivity.
- WebSocket activity should keep the service active while players are connected.
