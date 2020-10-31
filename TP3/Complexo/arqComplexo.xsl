<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        
        <xsl:result-document href="tabsite/index.html">
            <html>
                <head>
                    <title>Arqueossítios</title>
                </head>
                
                <body>
                    <h3>Arqueossítios</h3>
                    <ul>
                        <xsl:apply-templates mode="indice" select="//ARQELEM">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ul>
                </body>
                
            </html>
        </xsl:result-document>
        
        <xsl:apply-templates/>
        
        
    </xsl:template>
    
    <!-- templates para o indice ......................... -->
    
    <xsl:template match="ARQELEM" mode ="indice">
        <li>
            <a name="{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
                -
                <xsl:value-of select="CONCEL"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- templates para o conteúdo ......................... -->
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="tabsite/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                
                <body>
                    <p><b>Nome:</b> <xsl:value-of select="IDENTI"/></p>
                    <p><b>Lugar:</b> <xsl:value-of select="LUGAR"/></p>
                    <p><b>Freguesia:</b> <xsl:value-of select="FREGUE"/></p>
                    <p><b>Concelho:</b> <xsl:value-of select="CONCEL"/></p>
                    
                    <address>[<a href="./tabsite2/{generate-id()}.html">Mais Informações</a>]</address>
                    <address>[<a href="index.html">Voltar ao índice</a>]</address>
                </body>
            </html>
            
        </xsl:result-document>
        
        <xsl:result-document href="tabsite/tabsite2/{generate-id()}.html">
            <html>
                <head>
                    <title>Informações sobre <xsl:value-of select="IDENTI"/></title>
                </head>
                
                <body>
                    <p><b>Latitude:</b> <xsl:value-of select="LATITU"/></p>
                    <p><b>Longitutude:</b> <xsl:value-of select="LONGIT"/></p>
                    <p><b>Altitude:</b> <xsl:value-of select="ALTITU"/></p>
                    <p><b>Acesso:</b> <xsl:value-of select="ACESSO"/></p>
                    <address>[<a href="../{generate-id()}.html">Recuar</a>]</address>
                    <address>[<a href="../index.html">Voltar ao índice</a>]</address>
                </body>
            </html>
        </xsl:result-document>
        
        
    </xsl:template>
</xsl:stylesheet>