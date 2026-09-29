cat > ~/newfile.sh << 'SH' 
#!/bin/bash
# Usage: bash ~/newfile.sh namafile
# Otomatis buat file kosong & buka nano
FILE=$1
if [ -z "$FILE" ]; then
    echo "❌ Pakai: bash ~/newfile.sh namafile"
    exit 1
fi
touch "$FILE"
nano "$FILE"
SH
chmod +x ~/newfile.sh
