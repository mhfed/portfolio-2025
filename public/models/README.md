# 3D Character Model Placement

Place your downloaded 3D model into this folder (`public/models/`) with any of the following names:
- `character.glb` (recommended)
- `scene.glb`
- `ninja.glb`
- `samurai.glb`
- `scene.gltf` (with its accompanying `.bin` and `textures/` folder)

### Downloading from Sketchfab (e.g., Ninja AI Metin 2):
1. On the Sketchfab page: click **"Download 3D Model"**
2. Choose **glTF** (or **Autoconverted format (glTF / GLB)**)
3. If you download a `.glb`, rename it to `character.glb` and place it here.
4. If you download a `.zip`, extract its contents (`scene.gltf`, `scene.bin`, `textures/`) directly into `public/models/`.

When present, `KageSanctuaryCanvas` will automatically load the model using `GLTFLoader`, auto-scale it to realistic human proportions, enable soft PBR shadows, and animate its ascent along the Kyoto sanctuary staircase as you scroll!

