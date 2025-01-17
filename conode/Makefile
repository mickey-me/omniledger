CONTAINER = conode
IMAGE_NAME = c4dt/$(CONTAINER)
TAG = dev-$(shell date +%y%m%d)

# -s -w are for smaller binaries
# -X compiles the git tag into the binary
ldflags=-s -w -X main.gitTag=$(TAG)

all: docker

# Use this target to build from local source
docker: clean build/Dockerfile
	docker build -t $(IMAGE_NAME):$(TAG) -f build/Dockerfile build
	docker tag $(IMAGE_NAME):$(TAG) $(IMAGE_NAME):dev

newdb:
	make -C .. cothority-pull
	@echo "Compiling binaries"; \
	rm -f build/conodes/*db; \
	GO111MODULE=on go build -o build/conode; \
	cd ../cothority; \
		go build -o conode/bcadmin ./byzcoin/bcadmin; \
		go build -o conode/phapp ./personhood/phapp
	@echo "Starting nodes"; \
	cp ../cothority/conode/run_nodes.sh build; \
	( cd build; COTHORITY_ALLOW_INSECURE_ADMIN=true ./run_nodes.sh -v 2 -t -n 4 -s -d conodes > /dev/null & )
	@echo "Waiting for nodes to start up"; sleep 10; \
	echo "Creating new ByzCoin and printing out important variables"; echo; \
	rm -f *.cfg; \
	( ./bcadmin -c . create build/conodes/public.toml --interval 500ms; \
	  ./bcadmin latest --bc bc-*; \
	  ./bcadmin key -print key-* ) | egrep "^(ByzCoin|Admin|Private)" | tee variables.txt
	@echo; echo "Shutting down conodes"; pkill -x conode; rm build/conodes/running

docker_run:
	docker rm -f $(CONTAINER) || echo nothing to stop
	cp build/conodes/public.toml ../webapp/src/assets/conodes.toml
	docker run --rm -it -p 7770-7777:7770-7777 --name $(CONTAINER) $(IMAGE_NAME):dev

docker_stop:
	docker stop $(CONTAINER)

docker_start:
	docker start $(CONTAINER)

docker_clean:
	docker kill $(CONTAINER) || echo nothing to stop
	docker image ls $(IMAGE_NAME) -q | xargs docker rmi -f || echo done

clean:
	rm -rf build/conode
