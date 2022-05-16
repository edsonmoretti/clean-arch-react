@echo off

echo RRRRRRRR    OOOOOO    KK    KK   II    OO0000
echo RR    RR   OO    OO   KK  KK     II   OO    OO
echo RR  RR     OO    OO   KK KK      II   OO    OO
echo RR RR      OO    OO   KK KK      II   OO    OO
echo RR   RR    OO    OO   KK   KK    II   OO    OO
echo RR    RR    OO00OO    KK    KK   II    OO00OO

timeout 2
cls
if [%1]==[] (goto nenhum-comando)
if ["%1"]==[""] (goto nenhum-comando)
if %1=="install" (goto install)
if "%1"=="install" (goto install)
if "%1"=="make" (goto make)
if %1=="make" (goto make)
if %1=="test" (npm run test:watch)
if "%1"=="test" (npm run test:watch)
if %1=="teste" (npm run test:watch)
if "%1"=="teste" (npm run test:watch)
if %1=="help" (goto help)
if "%1"=="help" (goto help)
%1 %2 %3 %4 %5 %6 %7 %8 %9 %10
goto end

:nenhum-comando
echo Nenhum comando reconhecido.
goto end

:nenhum-comando-install
echo Comando "install" necessita de parametro. Ex.: install template
goto end

:nenhum-comando-make
echo Comando "make" necessita de parametro. Ex.: make model Teste
goto end

:nenhum-comando-make-model
echo Comando "make model" necessita de parametro. Ex.: make model Teste
goto end

:nenhum-comando-make-error
echo Comando "make error" necessita de parametro. Ex.: make error internal-server-error
goto end

:install
if [%2]==[] (goto nenhum-comando-install)
if ["%2"]==[""] (goto nenhum-comando-install)
if "%2"=="template" (goto install-template)
if %2=="template" (goto install-template)

goto nenhum-comando-install
goto end

:install-template
cd src
cd presentation
echo Baixando template...
git clone https://github.com/testing-library/react-testing-library.git
echo Instalando template...
cd react-testing-library
npm install
echo Instalacao finalizada!
cd ..
cd ..
cd ..
goto end

:make
if [%2]==[] (goto nenhum-comando-make)
if ["%2"]==[""] (goto nenhum-comando-make)
if "%2"=="model" (goto make-model)
if %2=="model" (goto make-model)
if "%2"=="error" (goto make-error)
if %2=="error" (goto make-error)
goto nenhum-comando-make
goto end

:make-model
IF [%3] == [] (goto nenhum-comando-make-model)
IF ["%3"] == [""] (goto nenhum-comando-make-model)
setlocal EnableDelayedExpansion
set "string=%3"
rem Do the split:
set i=1
set "fn!i!=%string:-=" & set /A i+=1 & set "fn!i!=%"

set modelName=%fn1%%fn2%%fn3%%fn4%%fn5%%fn6%%fn7%%fn8%%fn9%%fn10%%fn11%%fn12%%fn13%%fn14%%fn15%%fn16%%fn17%%fn18%%fn19%%fn20%%fn21%%fn22%%fn23%%fn24%%fn25%%fn26%%fn27%%fn28%%fn29%%fn30%%fn31%%fn32%%fn33%%fn34%%fn35%%fn36%%fn37%%fn38%%fn39%%fn40%%fn41%%fn42%%fn43%%fn44%%fn45%%fn46%%fn47%%fn48%%fn49%%fn50%%fn51%%fn52%%fn53%%fn54%%fn55%%fn56%%fn57%%fn58%%fn59%%fn60%%fn61%%fn62%%fn63%%fn64%%fn65%%fn66%%fn67%%fn68%%fn69%%fn70%%fn71%%fn72%%fn73%%fn74%%fn75%%fn76%%fn77%%fn78%%fn79%%fn80%%fn81%%fn82%%fn83%%fn84%%fn85%%fn86%%fn87%%fn88%%fn89%%fn90%%fn91%%fn92%%fn93%%fn94%%fn95%%fn96%%fn97%%fn98%%fn99%%fn100%

cd src
cd domain
cd models
echo Criando model...
echo export type %modelName% = { > %3.ts
echo     id: number; >> %3.ts
echo     createdAt: Date; >> %3.ts
echo     updatedAt: Date; >> %3.ts
echo }; >> %3.ts
echo.
echo /src/domain/models/%3.ts
echo Model criado com sucesso!
echo ---------------------------------------------------
cd ..
cd ..
cd ..
goto end

:make-error
IF [%3] == [] (goto nenhum-comando-make-error)
IF ["%3"] == [""] (goto nenhum-comando-make-error)
setlocal EnableDelayedExpansion
set "string=%3"
rem Do the split:
set i=1
set "fn!i!=%string:-=" & set /A i+=1 & set "fn!i!=%"

set errorName=%fn1%%fn2%%fn3%%fn4%%fn5%%fn6%%fn7%%fn8%%fn9%%fn10%%fn11%%fn12%%fn13%%fn14%%fn15%%fn16%%fn17%%fn18%%fn19%%fn20%%fn21%%fn22%%fn23%%fn24%%fn25%%fn26%%fn27%%fn28%%fn29%%fn30%%fn31%%fn32%%fn33%%fn34%%fn35%%fn36%%fn37%%fn38%%fn39%%fn40%%fn41%%fn42%%fn43%%fn44%%fn45%%fn46%%fn47%%fn48%%fn49%%fn50%%fn51%%fn52%%fn53%%fn54%%fn55%%fn56%%fn57%%fn58%%fn59%%fn60%%fn61%%fn62%%fn63%%fn64%%fn65%%fn66%%fn67%%fn68%%fn69%%fn70%%fn71%%fn72%%fn73%%fn74%%fn75%%fn76%%fn77%%fn78%%fn79%%fn80%%fn81%%fn82%%fn83%%fn84%%fn85%%fn86%%fn87%%fn88%%fn89%%fn90%%fn91%%fn92%%fn93%%fn94%%fn95%%fn96%%fn97%%fn98%%fn99%%fn100%
set errorString=%fn1% %fn2% %fn3% %fn4% %fn5% %fn6% %fn7% %fn8% %fn9% %fn10% %fn11% %fn12% %fn13% %fn14% %fn15% %fn16% %fn17% %fn18% %fn19% %fn20% %fn21% %fn22% %fn23% %fn24% %fn25% %fn26% %fn27% %fn28% %fn29% %fn30% %fn31% %fn32% %fn33% %fn34% %fn35% %fn36% %fn37% %fn38% %fn39% %fn40% %fn41% %fn42% %fn43% %fn44% %fn45% %fn46% %fn47% %fn48% %fn49% %fn50% %fn51% %fn52% %fn53% %fn54% %fn55% %fn56% %fn57% %fn58% %fn59% %fn60% %fn61% %fn62% %fn63% %fn64% %fn65% %fn66% %fn67% %fn68% %fn69% %fn70% %fn71% %fn72% %fn73% %fn74% %fn75% %fn76% %fn77% %fn78% %fn79% %fn80% %fn81% %fn82% %fn83% %fn84% %fn85% %fn86% %fn87% %fn88% %fn89% %fn90% %fn91% %fn92% %fn93% %fn94% %fn95% %fn96% %fn97% %fn98% %fn99% %fn100%

cd src
cd domain
cd errors
echo Criando arquivo de erro...
echo export class %errorName% extends Error { > %3.ts
echo    constructor() { >> %3.ts
echo        super('%errorString%'); >> %3.ts
echo        this.name = '%errorName%'; >> %3.ts
echo    } >> %3.ts
echo } >> %3.ts
echo.
echo /src/domain/errors/%3.ts
echo Arquivo de erro criado com sucesso!
echo ---------------------------------------------------
cd ..
cd ..
cd ..

:end
exit /b

:help
echo **********************************************************
echo *                       MAKE                             *
echo * rokio make fileType file-name                          *
echo * Cria arquivos dentro dos dirtorios correspondentes     *
echo *                                                        *
echo * rokio make model file-name                             *
echo * Cria arquivo de model em src/domains/models            *
echo *                                                        *
echo * rokio make error file-name                             *
echo * Cria arquivo de erro em src/domains/errors             *
echo *                                                        *
echo *                      INSTALL                           *
echo * rokio install                                          *
echo * Instala dependencias do projeto                        *
echo *                                                        *
echo * rokio install template                                 *
echo * Baixa o template padrao do projeto e instala no        *
echo * diretorio presentation do projeto                      *
echo *                                                        *
echo *                      TEST                              *
echo * rokio test                                             *
echo * Executa os testes do projeto                           *
echo *                                                        *
echo **********************************************************
