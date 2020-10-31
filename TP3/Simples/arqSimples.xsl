<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    version="1.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title> Arqueossítios</title>
            </head>
            
            <body>
                <table width="100%" border="1">
                    <tr>
                      <td width="20%" valign="top">
                          <a name="indice"/>
                          <h3>Índice</h3>
                          <ol>
                              <xsl:apply-templates mode="indice" select="//ARQELEM">
                                  <xsl:sort select="IDENTI"/>
                              </xsl:apply-templates>
                          </ol>
                      </td>  
                      
                      <td>
                          <xsl:apply-templates mode="conteudo" select="//ARQELEM">
                              <xsl:sort select="IDENTI"/>
                          </xsl:apply-templates>
                      </td>
                    </tr>
                </table>
            </body>
        </html>
    </xsl:template>
    
    <!-- templates para o índice ________________________ -->
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a href="#{IDENTI}">
                <xsl:value-of select="IDENTI"/>
                - 
                <xsl:value-of select="CONCEL"/>
            </a>    
        </li>
    </xsl:template>
    
    <!-- templates para o conteudo ______________________ -->
    <xsl:template match="ARQELEM" mode="conteudo">
        <a name ="{IDENTI}"></a>
        <p><b>Nome:</b> <xsl:value-of select="IDENTI"/></p>
        <p><b>Lugar:</b> <xsl:value-of select="LUGAR"/></p>
        <p><b>Freguesia:</b> <xsl:value-of select="FREGUE"/></p>
        <p><b>Concelho:</b> <xsl:value-of select="CONCEL"/></p>
        
        <address>[<a href="#indice">Voltar ao indice</a>]</address>
        <center>
            <hr width="80%"/>
        </center>
    </xsl:template>
    
</xsl:stylesheet>