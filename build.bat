"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --pack-extension=%~dp0dist --pack-extension-key=%~dp0key.pem
if not exist "crx" mkdir crx
move /y %~dp0dist.crx %~dp0crx/selection-menu.crx