<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        
        <xsl:result-document href="arqweb/index.html">
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
            <a href="/arqs/{position()}">
                <xsl:value-of select="IDENTI"/>
                -
                <xsl:value-of select="CONCEL"/>
            </a>
        </li>
        
        <xsl:result-document href="./arqweb/arq{position()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                
                <body>
                    <p><b>Nome:</b> <xsl:value-of select="IDENTI"/></p>
                    <p><b>Lugar:</b> <xsl:value-of select="LUGAR"/></p>
                    <p><b>Freguesia:</b> <xsl:value-of select="FREGUE"/></p>
                    <p><b>Concelho:</b> <xsl:value-of select="CONCEL"/></p>
                </body>
            </html>
            
        </xsl:result-document>
    </xsl:template>
</xsl:stylesheet>